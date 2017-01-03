/**
 * Created by shenjj on 2016/12/9.
 */
import React from 'react';
import {Card} from 'antd';
import {Row, Col} from 'antd';
import {forecastDailyWeatherUrl, getDailyIcon, getBackgroundColor} from  '../Utils.js'

const defStyle = {
    marginRight: '100px',
    marginLeft: '100px',
    marginTop: '20px',
    marginBottom: '20px',
    background: "red50",
    fontSize: "14px",
    fontFamily: "Georgia"
};

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
                console.dir(JSON.stringify(json));
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
                console.error('parsing failed', ex);
            });
    }

    getIconById(iconId) {
        let iconUri = getDailyIcon(iconId);
        // console.log("iconUri=" + iconUri);
        return iconUri;
    }

    getColorById(iconId) {
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
            let dailyItemList = new Array();
            for (let i = 1; i < dailyList.length; i++) {
                let backgroundColor = this.getColorById(dailyList[i].day.icon_code);
                let dailyItem =
                    <li key={dailyList[i].num}>
                        <div>
                            <Row justify="space-between" align="middle" type="flex"
                                 style={
                                     {
                                         color: "#ffffff",
                                         background: backgroundColor
                                     }
                                 }>
                                <Col span={2}>
                                    {dailyList[i].dow}
                                </Col>
                                <Col span={4}>
                                    <img src={this.getIconById(dailyList[i].day.icon_code)}/>

                                </Col>
                                <Col span={8}>
                                    {dailyList[i].day.phrase_32char}
                                </Col>

                                <Col span={2} offset={6}>
                                    <span>{dailyList[i].day.qpf}</span>
                                    <br/>
                                    <span>mm</span>
                                </Col>

                                <Col span={1}>
                                    {dailyList[i].max_temp}º
                                </Col>
                                <Col span={1} style={{
                                    color: "#d1d1d1"
                                }}>
                                    {dailyList[i].min_temp}º
                                </Col>
                            </Row>

                            <div className="divider" style={{
                                height: "1px",
                                background: "#ebebeb"
                            }}></div>
                        </div>
                    </li>;
                dailyItemList.push(dailyItem);
            }

            // let dailyItemList = dailyList.map(
            //     (dailyItem) => {
            //         return <li key={dailyItem.num}>
            //             <div>
            //                 <Row>
            //                     <Col span={2}>
            //                         {"High " + dailyItem.max_temp}
            //                     </Col>
            //                     <Col span={2}>
            //                         {"Low " + dailyItem.min_temp}
            //                     </Col>
            //                 </Row>
            //             </div>
            //         </li>
            //     }
            // );
            return (
                <Card style={defStyle} bodyStyle={{
                    padding: 0
                }}>
                    <ul>
                        {dailyItemList}
                    </ul>
                </Card>
            )
        } else {
            return (<div></div>)
        }

    }
}
export default DailyWeatherComponent;