/**
 * Created by shenjj on 2016/12/9.
 */
import React from 'react';
import {View, Text, ListView, Image} from 'react-native';
import {forecastDailyWeatherUrl, getDailyIcon, getBackgroundColor} from  '../Utils.js'


let mLatitude;
let mLongitude;


class DailyWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyWeatherBean: null
        }
    }

    getDailyWeather() {
        let url = forecastDailyWeatherUrl(mLatitude, mLongitude);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                let mDailyWeatherBean = json;
                console.log(JSON.stringify(json));
                if (mDailyWeatherBean.metadata.status_code == 200) {
                    this.setState({
                        dailyWeatherBean: mDailyWeatherBean
                    });
                } else {
                    this.setState({
                        dailyWeatherBean: null
                    });
                }
            }
        ).catch(
            (ex) => {
                console.log(ex);
            });
    }

    getIconById(iconId) {
        let iconUri = getDailyIcon(iconId);
        // console.log("iconUri=" + iconUri);
        return iconUri;
    }

    getColorById(iconId) {
        console.log("icon_id=" + iconId);
        let color = getBackgroundColor(iconId);
        // console.log("iconUri=" + iconUri);
        return color;
    }

    render() {
        if (mLatitude != this.props.latitude && mLongitude != this.props.longitude) {
            mLatitude = this.props.latitude;
            mLongitude = this.props.longitude;
            this.getDailyWeather();
        }

        if (null != this.state.dailyWeatherBean) {
            let dailyList = this.state.dailyWeatherBean.forecasts;

            let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            dailyList = dailyList.slice(1, dailyList.length);//移除第一天数据
            dataSource = dataSource.cloneWithRows(dailyList);

            return (<View style={{marginTop:20,marginBottom:20}}>
                <ListView dataSource={dataSource}
                          renderRow={
              (forecastItem, sectionID, rowID)=>{
                let backgroundColor = this.getColorById(forecastItem.day.icon_code);
                return(
                  <View>
                      <View
                        style={
                          {
                            flexDirection:"row",
                            alignItems:"center",
                            backgroundColor: backgroundColor
                          }
                        }>
                        <Text style={{flex:2,alignItems:"center",  color: "#d1d1d1"}}>
                          {forecastItem.dow}
                        </Text>
                        <View style={{flex:2}}>
                          <Image source={this.getIconById(forecastItem.day.icon_code)}/>
                        </View>
                        <Text style={{flex:3,  color: "#d1d1d1"}}>
                          {forecastItem.day.phrase_32char}
                        </Text>

                        <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          <Text style={{color: "#d1d1d1"}}>{forecastItem.day.qpf}</Text>
                          <Text style={{color: "#d1d1d1"}}>mm</Text>
                        </View>

                        <Text style={{flex:1,  color: "#d1d1d1"}}>
                          {forecastItem.max_temp}º
                        </Text>
                        <Text style={{flex:1,  color: "#d1d1d1"}}>
                        {forecastItem.min_temp}º
                      </Text>
                    </View>

                    <View className="Viewider" style={{
                      height: 1,
                      backgroundColor: "#ebebeb"
                    }}></View>
                  </View>
              );
            }
          }>
                </ListView>
            </View>)
        } else {
            return (<View></View>)
        }
    }
}
export default DailyWeatherComponent;
