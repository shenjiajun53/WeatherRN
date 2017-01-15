/**
 * Created by shenjj on 2017/1/13.
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
    ScrollView,
    Platform,
    BackAndroid
} from 'react-native';
import {findCityByName} from  '../Utils.js'

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
            <View style={{}}>
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

    async onLocationClicked(value) {
        console.info(JSON.stringify(value));
        this.props.getSelectedLocation(value);
        // localStorage.setItem(CURRENT_CITY, value);
        try {
            await AsyncStorage.setItem("current_city", JSON.stringify(value));
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
                              renderRow={(rowData, sectionID, rowID) => {
                                  {/*console.log(rowData);*/
                                  }
                                  {/*console.log("sectionID="+sectionID+" rowID="+rowID);*/
                                  }
                                  {/*console.log(mCityBean.addresses[rowID]);*/
                                  }
                                  return (<Text style={{textAlign: "center", backgroundColor: "white"}}
                                                onPress={(rowData) => this.onLocationClicked(mCityBean.addresses[rowID])}>
                                      {rowData.address}
                                  </Text>)
                              }
                              }
                    />
                </View>
            );
        } else {
            return (<View></View>);
        }
    }
}

class LocationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressResponse: null,
            latitude: null,
            longitude: null,
            address: null,
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackClicked);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackClicked);
        }
    }

    onBackClicked() {
        this.props.onBack();
        return false;
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
        this.props.getSelectedLocation(value);
        this.props.onBack();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                top: 0,
                left: 0,
                backgroundColor: "#ffffff"
            }}>
                <TitleBar onResponseLocation={(value) => this.onResponseLocation(value)}/>

                <AddressList style={{
                    flexWrap: "wrap",
                    backgroundColor: "yellow",
                }}
                             addressResponse={this.state.addressResponse}
                             getSelectedLocation={(value) => this.getSelectedLocation(value)}>
                </AddressList>

                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={{backgroundColor: "#2193f0", margin: 5}}>点我返回上一场景</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LocationPage;