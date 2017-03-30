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
    ScrollView,
    Image,
    Dimensions,
    Platform,
    BackAndroid,
} from 'react-native';
import {findCityByName, getBackgroundImage, currentWeatherUrl} from  '../Utils.js'
import CurrentWeatherCard from './CurrentWeatherCard';
import HourlyWeatherComponent from './HourlyWeatherComponent';
import DailyWeatherComponent from './DailyWeatherComponent';

const CURRENT_CITY = "current_city";

console.disableYellowBox = true;

let mCurrentCity;
class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            address: null,
            backgroundImg: require("../../res/drawable-xxhdpi/bg_white.jpg"),
            currentWeatherBean: null
        }
    }

    componentWillMount() {
        // console.log("componentWillMount");
        this.parseCity();

        // if (Platform.OS === 'android') {
        //     BackAndroid.removeEventListener('hardwareBackPress', () => {
        //         // this.props.onBack();
        //         // return false;
        //     });
        // }
    }

    // shouldComponentUpdate() {
    //     console.log("shouldComponentUpdate");
    //     // this.parseCity();
    //     return true;
    // }
    componentWillUpdate() {
        this.parseCity();
    }

    parseCity() {
        // console.log("parse city");
        const currentCity = this.props.currentCity;
        if (null !== currentCity && mCurrentCity != currentCity) {
            mCurrentCity = currentCity;
            console.log(JSON.stringify(currentCity));
            this.setState({
                latitude: currentCity.latitude,
                longitude: currentCity.longitude,
                address: currentCity.address,
            });
            this.getCurrentWeather(currentCity);
        } else {
            // console.log("current city null or no change");
        }
    }

    getCurrentWeather(currentCity) {
        let url = currentWeatherUrl(currentCity.latitude, currentCity.longitude);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                let mCurrentWeatherBean = json;
                console.log(JSON.stringify(json));
                if (mCurrentWeatherBean.metadata.status_code == 200) {
                    this.getBackground(mCurrentWeatherBean);
                } else {
                    this.setState({
                        currentWeatherBean: null
                    });
                }
            }
        ).catch(
            (ex) => {
                console.log('parsing failed', ex);
            });
    }

    getBackground(currentWeather) {
        const bg = getBackgroundImage(currentWeather.observation.icon_code);
        this.setState({
            currentWeatherBean: currentWeather,
            backgroundImg: bg
        })
    }

    render() {
        // console.log("start render");
        return (
            <View style={{flex: 1}}>
                <Image style={{
                    flex: 1,
                    flexDirection: "column",
                    top: 0,
                    left: 0,
                    width: Dimensions.get('window').width,
                }} source={this.state.backgroundImg}>


                    <ScrollView style={{}}>
                        <View style={{flex: 1, height: Dimensions.get('window').height - 20}}>
                            <View style={{flex: 1}}/>
                            <View>
                                <CurrentWeatherCard address={this.state.address}
                                                    currentWeatherBean={this.state.currentWeatherBean}/>
                            </View>
                        </View>
                        <HourlyWeatherComponent latitude={this.state.latitude}
                                                longitude={this.state.longitude}/>
                        <DailyWeatherComponent latitude={this.state.latitude}
                                               longitude={this.state.longitude}/>

                    </ScrollView>

                    <View style={{flexDirection: "row", marginTop: 10, marginBottom: 10, position: "absolute"}}>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={this.props.onForward}
                                          background={TouchableNativeFeedback.SelectableBackground()}>
                            <Image source={require("../../res/drawable-xhdpi/ic_menu.png")}
                                   style={{marginRight: 16, height: 24, width: 24}}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
}

export default MainComponent;
