/**
 * Created by Administrator on 2016/11/27.
 */
// @flow


import React from 'react';
import {
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


class CurrentWeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeatherBean: this.props.currentWeatherBean
        };
    }

    render() {
        if (null != this.props.currentWeatherBean) {
            const currentWeatherBean = this.props.currentWeatherBean;
            const observationBean = currentWeatherBean.observation;
            const metricBean = currentWeatherBean.observation.metric;
            return (
                <View className="View-content" style={{flexDirection: "column"}}
                      bodyStyle={{
                          padding: 0
                      }}>
                    <View style={{
                        backgroundColor: "#ffffff",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{fontSize: 20, marginLeft: 45}}>
                            {metricBean.temp}℃
                        </Text>
                        <View style={{marginLeft: 16}}>
                            <Text style={{fontSize: 16}}>
                                {observationBean.phrase_32char}
                            </Text>
                            <Text style={{fontSize: 16}}>
                                {this.props.address}
                            </Text>
                        </View>
                    </View>

                    <View className="divider" style={{
                        height: 1,
                        backgroundColor: "#ebebeb"
                    }}></View>

                    <View style={{
                        padding: 20,
                        backgroundColor: "#f5f5f5"
                    }}>
                        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>高</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_high_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text>
                                    {metricBean.temp_max_24hour}
                                </Text>
                                <Text>
                                    ℃
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>低</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_low_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text>
                                    {metricBean.temp_min_24hour}
                                </Text>
                                <Text>
                                    ℃
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>降水</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_preciptation_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text>
                                    {metricBean.precip_24hour}
                                </Text>
                                <Text>
                                    mm
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>湿度</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_humidity_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text id="humidity_value">
                                    {metricBean.rh}
                                </Text>
                                <Text>
                                    %
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>可见度</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_visibility_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text id="visibility_value">
                                    {metricBean.vis}
                                </Text>
                                <Text>
                                    公里
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>风速</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_wind_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text id="wind_value">
                                    {metricBean.wspd}
                                </Text>
                                <Text>
                                    公里每小时
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>气压</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_pressure_b.png')}
                                       style={{height: 36, width: 36}}/>
                                <Text id="pressure_value">
                                    {metricBean.mslp}
                                </Text>
                                <Text>
                                    毫巴
                                </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <Text>紫外线指数</Text>
                                <Image source={require('../../res/drawable-hdpi/currnet_uv_b.png')}
                                       style={{height: 36, width: 36}}/>
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
