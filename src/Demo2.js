/**
 * Created by shenjj on 2017/1/3.
 */
import React, {Component} from 'react';
import {AppRegistry, ListView, Text, View} from 'react-native';

class Demo2 extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    render() {
        console.log(this.state.dataSource);
        return (
            <View style={{flex: 1}}>
                <ListView
                    style={{
                        flex:1,
                        flexWrap:"wrap",
                        backgroundColor:"yellow",
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                    <Text style={{
                        textAlign:"center",
                    }}>
                    {rowData}
                    </Text>}

                >
                </ListView>

                <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',alignItems:"center"}}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}>

                    </View>
                    <View
                        style={{width: 100, height: 100, backgroundColor: 'skyblue',justifyContent:'center',alignItems:'center'}}>
                        <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
                    </View>
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
                </View>
            </View>
        );
    }
}

export default Demo2;