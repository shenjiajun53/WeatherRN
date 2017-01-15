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

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            address: null,
        }
    }

    parseCurrentCity() {
        const currentCity = this.props.currentCity;
        if (null !== currentCity) {
            console.log(JSON.stringify(currentCity));
            this.state.latitude = currentCity.latitude;
            this.state.longitude = currentCity.longitude;
            this.state.address = currentCity.address;
        } else {
            console.log("current city null");
        }
    }

    render() {
        console.log("start render");
        this.parseCurrentCity();
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    top: 0,
                    left: 0,
                }}>

                    <TouchableNativeFeedback onPress={this.props.onForward}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <Text style={{backgroundColor: "#2193f0", margin: 5}}>点我进入下一场景</Text>
                    </TouchableNativeFeedback>


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
            </View>
        );
    }
}

export default MainComponent;
