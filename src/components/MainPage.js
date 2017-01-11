/**
 * Created by shenjj on 2016/12/5.
 */

import React from 'react';
import {
    AppRegistry,
    ListView,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    AsyncStorage,
    ScrollView
} from 'react-native';
import {findCityByName} from  '../Utils.js'
import CurrentWeatherCard from './CurrentWeatherCard';
import HourlyWeatherComponent from './HourlyWeatherComponent';
import DailyWeatherComponent from './DailyWeatherComponent';

const CURRENT_CITY = "current_city";

console.disableYellowBox = true;

class TitleBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(value) {
        let url = findCityByName(value);
        // console.log("input = " + value + " \n url=" + url);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                // console.log(JSON.stringify(json));
                let mCityBean = json;
                if (mCityBean.metadata.status_code == 200) {
                    this.props.onResponseLocation(json);
                } else {
                    this.props.onResponseLocation(null);
                }
            }
        ).catch(
            (ex) => {
                console.warn('parsing failed', ex);
            });
    }

    render() {
        return (
            <View style={{
            }}>
                <TextInput
                    style={{width: 300}}
                    onChangeText={(value) => this.handleChange(value)}
                    placeholder="输入城市名"
                >
                </TextInput>
            </View>
        );
    }
}

class AddressList extends React.Component {
    constructor(props) {
        super(props);
    }

    async getSelectedLocation(value) {
        console.info(JSON.stringify(value));
        this.props.getSelectedLocation(value);
        // localStorage.setItem(CURRENT_CITY, value);
        try {
            await AsyncStorage.setItem(CURRENT_CITY, JSON.stringify(value));
        } catch (error) {
            // Error saving data
        }
    }

    render() {
        let mCityBean = this.props.addressResponse;
        if (null != mCityBean) {
            console.log(JSON.stringify(mCityBean));
            let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            dataSource = dataSource.cloneWithRows(mCityBean.addresses);
            // console.log(dataSource);
            return (
                <View>
                    <ListView dataSource={dataSource}
                              renderRow={(rowData, sectionID, rowID)=>{
                                 {/*console.log(rowData);*/}
                                 {/*console.log("sectionID="+sectionID+" rowID="+rowID);*/}
                                    {/*console.log(mCityBean.addresses[rowID]);*/}
                           return(<Text style={{textAlign:"center",backgroundColor:"white"}}
                                onPress={(rowData)=>this.getSelectedLocation(mCityBean.addresses[rowID])} >
                                {rowData.address}
                              </Text>)   }
                          }
                    />
                </View>
            );
        } else {
            return (<View></View>);
        }
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressResponse: null,
            latitude: null,
            longitude: null,
            address: null,
        }
    }

    async componentWillMount() {
        try {
            const currentCity = JSON.parse(await AsyncStorage.getItem(CURRENT_CITY));
            // const currentCity = JSON.parse(cityJson);
            if (null !== currentCity) {
                console.log(JSON.stringify(currentCity));
                this.setState(
                    {
                        addressResponse: null,
                        latitude: currentCity.latitude,
                        longitude: currentCity.longitude,
                        address: currentCity.address
                    }
                )
            } else {
                console.log("current city null");
            }
        } catch (error) {
            // Error retrieving data
            console.log("get item error=" + error);
        }
    }

    onResponseLocation(value) {
        // console.log("responseLocation=" + value);
        this.setState(
            {
                addressResponse: value
            }
        )
    }

    getSelectedLocation(value) {
        console.log(value.address);
        this.setState(
            {
                addressResponse: null,
                latitude: value.latitude,
                longitude: value.longitude,
                address: value.address
            }
        )
    }

    render() {
        console.log("start render");
        return (
            <View style={{}}>
                <View style={{flexDirection:"column"}}>
                    <TitleBar onResponseLocation={(value) => this.onResponseLocation(value)}/>
                    <ScrollView>
                        <CurrentWeatherCard address={this.state.address}
                                            latitude={this.state.latitude}
                                            longitude={this.state.longitude}/>
                        <HourlyWeatherComponent latitude={this.state.latitude}
                                                longitude={this.state.longitude}/>
                        <DailyWeatherComponent latitude={this.state.latitude}
                        longitude={this.state.longitude}/>
                    </ScrollView>
                </View>

                <AddressList style={{flex:1,
                        flexWrap:"wrap",
                        backgroundColor:"yellow",position:"absolute",marginTop:60}}
                             addressResponse={this.state.addressResponse}
                             getSelectedLocation={(value) => this.getSelectedLocation(value)}>
                </AddressList>
            </View>
        );
    }
}

export default MainComponent;
