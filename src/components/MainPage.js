/**
 * Created by shenjj on 2016/12/5.
 */

import React from 'react';
import {AppRegistry, ListView, Text, View, TextInput} from 'react-native';
import {findCityByName} from  '../Utils.js'

const CURRENT_CITY = "current_city";

class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
            inputValue: ""
        }
    }

    handleChange(value) {
        let url = findCityByName(value);
        console.log("input = " + value);
        fetch(url)
            .then(
                (response) => response.json()
            ).then(
            (json) => {
                console.dir(JSON.stringify(json));
                let mCityBean = json;
                if (mCityBean.metadata.status_code == 200) {
                    this.setState({
                        addressList: mCityBean.addresses,
                        inputValue: value
                    });
                } else {
                    this.setState({
                        addressList: null,
                        inputValue: null
                    });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    onSelect(value) {
        console.log('onSelect', value);
        this.props.getSelectedLocation(value);
        localStorage.setItem(CURRENT_CITY, value);
    }

    render() {
        // console.log("start render");
        // console.log(JSON.stringify(this.state.addressList));
        // let addressOption = new Array();
        // if (null != this.state.addressList) {
        //     for (let i = 0; i < this.state.addressList.length; i++) {
        //         let addressBean = this.state.addressList[i];
        //         console.log(JSON.stringify(addressBean));
        //         let item = <AutoComplete.Option
        //             key={addressBean.latitude + " " + addressBean.longitude}>
        //             {addressBean.address}
        //         </AutoComplete.Option>;
        //         addressOption.push(item);
        //     }
        // }

        // let addressOption = new Array();
        // if (null != this.state.addressList) {
        //     addressOption = this.state.addressList.map(
        //         (addressBean) => {
        //             // console.dir(JSON.stringify(addressBean));
        //             return <AutoComplete.Option
        //                 key={addressBean.latitude + "_" + addressBean.longitude + "_" + addressBean.address}>
        //                 {addressBean.address}
        //             </AutoComplete.Option>;
        //         }
        //     );
        // }
        // console.log("option size=" + addressOption.length);
        return (
            <View style={{
                flex:1,
                flexDirection:"column"
            }}>

                <TextInput
                    combobox
                    filterOption={false}
                    style={{width: 300}}
                    onSelect={(value) => this.onSelect(value)}
                    onSearch={(value) => this.handleChange(value)}
                    placeholder="输入城市名"
                >
                    {addressOption}
                </TextInput>

                <ListView>

                </ListView>
            </View>
        );
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            address: null,
        }
    }

    componentWillMount() {
        // let currentCity = localStorage.getItem(CURRENT_CITY);
        // if (null !== currentCity) {
        //     let strArray = currentCity.split("_");
        //     // console.log(strArray[0]);
        //     // console.log(strArray[1]);
        //     this.setState(
        //         {
        //             latitude: strArray[0],
        //             longitude: strArray[1],
        //             address: strArray[2]
        //         }
        //     )
        // }
    }

    getSelectedLocation(value) {
        console.log("selectedLocation=" + value);
        let strArray = value.split("_");
        // console.log(strArray[0]);
        // console.log(strArray[1]);
        this.setState(
            {
                latitude: strArray[0],
                longitude: strArray[1],
                address: strArray[2]
            }
        )
    }

    render() {
        console.log("start render");
        return (
            <div>
                <TitleBar getSelectedLocation={(value) => this.getSelectedLocation(value)}/>
                {/*<CurrentWeatherCard address={this.state.address}*/}
                                    {/*latitude={this.state.latitude}*/}
                                    {/*longitude={this.state.longitude}/>*/}
                {/*<HourlyWeatherComponent latitude={this.state.latitude}*/}
                                        {/*longitude={this.state.longitude}/>*/}
                {/*<DailyWeatherComponent latitude={this.state.latitude}*/}
                                       {/*longitude={this.state.longitude}/>*/}
            </div>
        );
    }
}

export default MainComponent;