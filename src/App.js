import React, {Component} from 'react';
import {
    View, Navigator,
    AsyncStorage,
} from 'react-native';
import MainPage from './components/MainPage'
import LocationPage from './components/LocationPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: null,
            showLocationPage: true,
            initIndex: 0
        }
    }

    async componentWillMount() {
        try {
            const currentCity = JSON.parse(await AsyncStorage.getItem("current_city"));
            // const currentCity = JSON.parse(cityJson);
            if (null !== currentCity) {
                console.log(JSON.stringify(currentCity));
                this.setState(
                    {
                        currentCity: currentCity,
                        showLocationPage: false,
                        initIndex: 0
                    }
                )
            } else {
                console.log("current city null");
                this.setState({
                    currentCity: null,
                    showLocationPage: true,
                    initIndex: 1
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log("get item error=" + error);
        }
    }

    getSelectedLocation(value) {
        console.log(value.address);
        this.setState(
            {
                currentCity: value,
                showLocationPage: false,
                initIndex: 0
            }
        )
    }

    render() {
        return (
            <Navigator style={{flex: 1}}
                       initialRoute={{title: 'My Initial Scene', index: 0}}
                       renderScene={(route, navigator) => {
                           console.log("initIndex=" + this.state.initIndex + " index=" + route.index);
                           {/*if (this.state.initIndex == 1 && route.index == 0) {*/}
                               {/*const nextIndex = route.index + 1;*/}
                               {/*navigator.push({index: nextIndex});*/}
                           {/*}*/}
                           switch (route.index) {
                               case 0:
                                   return (<MainPage
                                       currentCity={this.state.currentCity}

                                       // Function to call when a new scene should be displayed
                                       onForward={ () => {
                                           const nextIndex = route.index + 1;
                                           navigator.push({
                                               title: 'Scene ' + nextIndex,
                                               index: nextIndex
                                           });
                                           this.state.showLocationPage = false;
                                       }}
                                   />);
                                   break;
                               case 1:
                                   return (
                                       <LocationPage
                                           // Function to call to go back to the previous scene
                                           onBack={() => {
                                               if (route.index > 0) {
                                                   navigator.pop();
                                                   this.state.showLocationPage = true;
                                               }
                                           }}

                                           getSelectedLocation={(value) => this.getSelectedLocation(value)}>
                                       </LocationPage>);
                                   break;
                           }
                       }}
            />
        );
    }
}

export default App;
