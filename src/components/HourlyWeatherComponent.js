/**
 * Created by shenjj on 2016/12/9.
 */
import React from 'react';
import {
    ListView,
    Text,
    View,
    Image
} from 'react-native';
import {forcastHourlyWeatherUrl, getHourlyIcon} from  '../Utils.js'
// import uri from '../../res/drawable-hdpi/mini_icons_sunny_h.png';


// const uri='../../res/drawable-hdpi/mini_icons_sunny_h.png';
// let iconUri = require(uri);
// let uri = require('../../res/drawable-hdpi/mini_icons_sunny_h.png');

let mLatitude;
let mLongitude;

class HourlyWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourlyWeatherBean: null
        }
    }

    getHourlyWeather() {
        let url = forcastHourlyWeatherUrl(mLatitude, mLongitude);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                let mHourlyWeatherBean = json;
                // console.log(JSON.stringify(json));
                if (mHourlyWeatherBean.metadata.status_code == 200) {
                    this.setState({
                        hourlyWeatherBean: mHourlyWeatherBean
                    });
                } else {
                    this.setState({
                        hourlyWeatherBean: null
                    });
                }
            }
        ).catch(
            (ex) => {
                console.log('parsing failed', ex);
            });
    }

    formatTime(time) {
        time = time.substring(11, 16);
        return time;
    }

    getIconById(iconId) {
        let iconUri = getHourlyIcon(iconId);
        // console.log("iconUri=" + iconUri);
        return iconUri;
    }

    render() {
        if (mLatitude != this.props.latitude && mLongitude != this.props.longitude) {
            mLatitude = this.props.latitude;
            mLongitude = this.props.longitude;
            this.getHourlyWeather();
        }
        if (null != this.state.hourlyWeatherBean) {
            let forecastList = this.state.hourlyWeatherBean.forecasts;
            let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            dataSource = dataSource.cloneWithRows(forecastList);

            return (
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <View type="flex" align="middle" justify="space-around" style={{
                        backgroundColor: "#f5f5f5"
                    }}>
                        <ListView
                            dataSource={dataSource}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderRow={
                                (forecastItem, sectionID, rowID) => {
                                    return (
                                        <View key={forecastItem.num}
                                              style={{
                                                  alignItems: "center",
                                                  marginLeft: 5,
                                                  marginRight: 5,
                                                  paddingBottom: 5,
                                                  paddingTop: 5
                                              }}>
                                            <Text style={{}}>
                                                {this.formatTime(forecastItem.fcst_valid_local)}
                                            </Text>
                                            <View className="Viewider" style={{
                                                height: 1,
                                                backgroundColor: "#ebebeb"
                                            }}></View>

                                            <Image source={this.getIconById(forecastItem.icon_code)} style={{}}/>
                                            <Text style={{}}>
                                                {forecastItem.temp}º
                                            </Text>
                                        </View>
                                    )
                                }
                            }>

                        </ListView>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }
}
export default HourlyWeatherComponent;
