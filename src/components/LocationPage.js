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
    BackAndroid,
    Image,
    Dimensions
} from 'react-native';
import {findCityByName, findCityByGeoLocation} from  '../Utils.js'

class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ""
        }
    }

    handleChange(value) {
        this.setState({
            textValue: value
        });
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

    clearText() {
        this.setState({
            textValue: ""
        });
        this.props.onResponseLocation(null);
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff"}}>
                    <TouchableOpacity onPress={() => this.props.onBackClick()}>
                        <Image source={require("../../res/drawable-xhdpi/back_arrow.png")}
                               style={{height: 30, width: 30, marginRight: 5, marginLeft: 16}}/>
                    </TouchableOpacity>
                    <TextInput
                        value={this.state.textValue}
                        style={{width: 300, flex: 1}}
                        onChangeText={(value) => this.handleChange(value)}
                        placeholder="输入城市名"
                        underlineColorAndroid={"#00000000"}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => this.clearText()}>
                        <Image source={require("../../res/drawable-xhdpi/text_clear.png")}
                               style={{height: 30, width: 30, marginRight: 16, marginLeft: 5}}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: "#ebebeb", height: 1, alignItems: "stretch"}}/>
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
                                  return (
                                      <TouchableOpacity
                                          onPress={(rowData) => this.onLocationClicked(mCityBean.addresses[rowID])}
                                          background={TouchableNativeFeedback.SelectableBackground()}>
                                          <Text style={{
                                              textAlign: "center",
                                              backgroundColor: "white",
                                              fontSize: 16,
                                              paddingBottom: 3,
                                              paddingTop: 3
                                          }}
                                          >
                                              {rowData.address}
                                          </Text>
                                      </TouchableOpacity>
                                  )
                              }
                              }
                    />
                </View>
            );
        } else {
            return (<View/>);
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
            BackAndroid.addEventListener('hardwareBackPress', () => {
                this.props.onBack();
                return true;
            });
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', () => {
                this.props.onBack();
                return true;
            });
        }
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.getCityByLocation(position);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000})
    }

    getCityByLocation(position) {
        // const positionStr = JSON.stringify(position);
        // console.log("position=" + positionStr);
        let url = findCityByGeoLocation(position.coords.latitude + "," + position.coords.longitude);
        console.log("url=" + url);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                console.log(JSON.stringify(json));
                let mCityBean = json;
                if (mCityBean.metadata.status_code == 200) {
                    this.onResponseLocation(json);
                } else {
                    this.onResponseLocation(null);
                }
            }
        ).catch(
            (ex) => {
                console.warn('parsing failed', ex);
            });
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
                backgroundColor: "#ffffff"
            }}>
                <TitleBar onResponseLocation={(value) => this.onResponseLocation(value)}
                          onBackClick={() => this.props.onBack()}/>

                <AddressList style={{
                    flexWrap: "wrap",
                    backgroundColor: "yellow",
                }}
                             addressResponse={this.state.addressResponse}
                             getSelectedLocation={(value) => this.getSelectedLocation(value)}>
                </AddressList>


                <View style={{
                    borderRadius: 50,
                    backgroundColor: "#FF4081",
                    padding: 10,
                    position: "absolute",
                    left: Dimensions.get('window').width - 60,
                    top: Dimensions.get('window').height - 100,
                }}>
                    <TouchableOpacity onPress={() => this.getLocation()}>
                        <Image
                            style={{
                                height: 30,
                                width: 30,
                            }}
                            source={require("../../res/drawable-xhdpi/location_bg.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LocationPage;