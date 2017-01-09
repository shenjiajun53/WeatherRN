/**
 * Created by Administrator on 2016/11/27.
 */


import React from 'react';
import {
    AppRegistry,
    ListView,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import {currentWeatherUrl} from  '../Utils.js'


// import hdpi from '../../res/drawable-hdpi';
// let imgUri = "../../res/drawable-hdpi/";
// const high = require("../../res/drawable-hdpi/currnet_high_b.png");

const defStyle = {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    padding: 0,
};

let mLatitude;
let mLongitude;

class CurrentWeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeatherBean: null
        };
    }

    getCurrentWeather() {
        let url = currentWeatherUrl(mLatitude, mLongitude);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                let mCurrentWeatherBean = json;
                console.dir(JSON.stringify(json));
                if (mCurrentWeatherBean.metadata.status_code == 200) {
                    this.setState({
                        currentWeatherBean: mCurrentWeatherBean
                    });
                } else {
                    this.setState({
                        currentWeatherBean: null
                    });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        if (mLatitude != this.props.latitude && mLongitude != this.props.longitude) {
            mLatitude = this.props.latitude;
            mLongitude = this.props.longitude;
            this.getCurrentWeather();
            // console.info("mLatitude=" + mLatitude);
        }
        if (null != this.state.currentWeatherBean) {
            const observationBean = this.state.currentWeatherBean.observation;
            const metricBean = this.state.currentWeatherBean.observation.metric;
            return (
                <View className="View-content" style={defStyle}
                      bodyStyle={{
                          padding: 0
                      }}>
                    <View type="flex" align="middle" justify="space-between"
                          style={{
                             marginTop: 10,
                             marginBottom: 10,
                             backgroundColor: "#ffffff"
                         }}>
                        <Text lg={8} md={12} sm={4} style={{fontSize: 20}}>
                            {metricBean.temp}℃
                        </Text>
                        <View lg={16} md={12} sm={20}>
                            <Text style={{fontSize: 16}}>
                                {observationBean.phrase_32char}
                            </Text>
                            <Text style={{fontSize: 16}}>
                                {this.props.address}
                            </Text>
                        </View>
                    </View>

                    <View className="Viewider" style={{
                        height: 1,
                        backgroundColor: "#ebebeb"
                    }}></View>

                    <View style={{
                        padding: 20,
                        backgroundColor: "#f5f5f5"
                    }}>
                        <View >
                            <View span={6} id="temper_high_View">
                                <Text>高</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_high_b.png')}/>
                                <Text>
                                    {metricBean.temp_max_24hour}
                                </Text>
                                <Text>
                                    ℃
                                </Text>
                            </View>
                            <View span={6} id="temper_low_View">
                                <Text>低</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_low_b.png')}/>
                                <Text>
                                    {metricBean.temp_min_24hour}
                                </Text>
                                <Text>
                                    ℃
                                </Text>
                            </View>
                            <View span={6} id="precipitation_View">
                                <Text>降水</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_preciptation_b.png')}/>
                                <Text>
                                    {metricBean.precip_24hour}
                                </Text>
                                <Text>
                                    mm
                                </Text>
                            </View>
                            <View span={6} id="humidity_View">
                                <Text>湿度</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_humidity_b.png')}/>
                                <Text id="humidity_value">
                                    {metricBean.rh}
                                </Text>
                                <Text>
                                    %
                                </Text>
                            </View>
                        </View>

                        <View className="View no_margin">
                            <View span={6} id="visibility_View">
                                <Text>可见度</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_visibility_b.png')}/>
                                <Text id="visibility_value">
                                    {metricBean.vis}
                                </Text>
                                <Text>
                                    公里
                                </Text>
                            </View>
                            <View span={6} id="wind_View">
                                <Text>风速</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_wind_b.png')}/>
                                <Text id="wind_value">
                                    {metricBean.wspd}
                                </Text>
                                <Text>
                                    公里每小时
                                </Text>
                            </View>
                            <View span={6} id="pressure_View">
                                <Text>气压</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_pressure_b.png')}/>
                                <Text id="pressure_value">
                                    {metricBean.mslp}
                                </Text>
                                <Text>
                                    毫巴
                                </Text>
                            </View>
                            <View span={6} id="uv_index_View">
                                <Text>紫外线指数</Text>
                                <Image src={require('../../res/drawable-hdpi/currnet_uv_b.png')}/>
                                <Text id="uv_index_value">
                                    {observationBean.uv_index}
                                </Text>
                                <Text>
                                    {observationBean.uv_desc}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
}

export default CurrentWeatherCard;
