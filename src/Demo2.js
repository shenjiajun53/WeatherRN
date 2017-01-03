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
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                    <Text style={{
                        textAlign:"center"
                    }}>
                    {rowData}
                    </Text>}
                />
            </View>
        );
    }
}

export default Demo2;