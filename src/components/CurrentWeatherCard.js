/**
 * Created by Administrator on 2016/11/27.
 */


import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Card} from 'antd';
import {Row, Col} from 'antd';
import {currentWeatherUrl} from  '../Utils.js'


// import hdpi from '../../res/drawable-hdpi';
// let imgUri = "../../res/drawable-hdpi/";
// const high = require("../../res/drawable-hdpi/currnet_high_b.png");

const defStyle = {
    marginRight: '100px',
    marginLeft: '100px',
    marginTop: '20px',
    marginBottom: '20px',
    padding: "0px",
    fontSize: "14px",
    fontFamily: "Georgia"
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
        }
        if (null != this.state.currentWeatherBean) {
            const observationBean = this.state.currentWeatherBean.observation;
            const metricBean = this.state.currentWeatherBean.observation.metric;
            return (
                <Card className="card-content" style={defStyle}
                      bodyStyle={{
                          padding: 0
                      }}>
                    <Row type="flex" align="middle" justify="space-between"
                         style={{
                             marginTop: "10px",
                             marginBottom: "10px",
                             background: "#ffffff"
                         }}>
                        <Col lg={8} md={12} sm={4} style={{fontSize: "20px"}}>
                            {metricBean.temp}℃
                        </Col>
                        <Col lg={16} md={12} sm={20} style={{fontSize: "16px"}}>
                            <span id="current_phrase">
                                {observationBean.phrase_32char}
                            </span>
                            <br/>
                            <span id="city_name">
                                {this.props.address}
                            </span>
                        </Col>
                    </Row>

                    <div className="divider" style={{
                        height: "1px",
                        background: "#ebebeb"
                    }}></div>

                    <div style={{
                        padding: "20px",
                        background: "#f5f5f5"
                    }}>
                        <Row >
                            <Col span={6} id="temper_high_div">
                                <div>高</div>
                                <img src={require('../../res/drawable-hdpi/currnet_high_b.png')}/>
                                <div>
                                    {metricBean.temp_max_24hour}
                                </div>
                                <div>
                                    ℃
                                </div>
                            </Col>
                            <Col span={6} id="temper_low_div">
                                <div>低</div>
                                <img src={require('../../res/drawable-hdpi/currnet_low_b.png')}/>
                                <div>
                                    {metricBean.temp_min_24hour}
                                </div>
                                <div>
                                    ℃
                                </div>
                            </Col>
                            <Col span={6} id="precipitation_div">
                                <div>降水</div>
                                <img src={require('../../res/drawable-hdpi/currnet_preciptation_b.png')}/>
                                <div>
                                    {metricBean.precip_24hour}
                                </div>
                                <div>
                                    mm
                                </div>
                            </Col>
                            <Col span={6} id="humidity_div">
                                <div>湿度</div>
                                <img src={require('../../res/drawable-hdpi/currnet_humidity_b.png')}/>
                                <div id="humidity_value">
                                    {metricBean.rh}
                                </div>
                                <div>
                                    %
                                </div>
                            </Col>
                        </Row>

                        <Row className="row no_margin">
                            <Col span={6} id="visibility_div">
                                <div>可见度</div>
                                <img src={require('../../res/drawable-hdpi/currnet_visibility_b.png')}/>
                                <div id="visibility_value">
                                    {metricBean.vis}
                                </div>
                                <div>
                                    公里
                                </div>
                            </Col>
                            <Col span={6} id="wind_div">
                                <div>风速</div>
                                <img src={require('../../res/drawable-hdpi/currnet_wind_b.png')}/>
                                <div id="wind_value">
                                    {metricBean.wspd}
                                </div>
                                <div>
                                    公里每小时
                                </div>
                            </Col>
                            <Col span={6} id="pressure_div">
                                <div>气压</div>
                                <img src={require('../../res/drawable-hdpi/currnet_pressure_b.png')}/>
                                <div id="pressure_value">
                                    {metricBean.mslp}
                                </div>
                                <div>
                                    毫巴
                                </div>
                            </Col>
                            <Col span={6} id="uv_index_div">
                                <div>紫外线指数</div>
                                <img src={require('../../res/drawable-hdpi/currnet_uv_b.png')}/>
                                <div id="uv_index_value">
                                    {observationBean.uv_index}
                                </div>
                                <div>
                                    {observationBean.uv_desc}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CurrentWeatherCard;
