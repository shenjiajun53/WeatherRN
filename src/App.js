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
                    }
                )
            } else {
                console.log("current city null");
                this.setState({
                    currentCity: null,
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
            }
        )
    }

    render() {
        return (
            <Navigator style={{flex: 1}}
                       initialRoute={{
                           index: 0,
                           showMainPage: true
                       }}
                       renderScene={(route, navigator) => {
                           {/*console.log("showMainPage=" + route.showMainPage);*/}

                           if (route.showMainPage && null != this.state.currentCity) {
                               return (<MainPage
                                   currentCity={this.state.currentCity}

                                   // Function to call when a new scene should be displayed
                                   onForward={ () => {
                                       const nextIndex = route.index + 1;
                                       navigator.push({
                                           index: nextIndex,
                                           showMainPage: false
                                       });
                                   }}
                               />);
                           } else {
                               return (
                                   <LocationPage
                                       // Function to call to go back to the previous scene
                                       onBack={() => {
                                           if (route.index > 0) {
                                               navigator.pop();
                                           } else {
                                               navigator.replace({showMainPage: true, index: 0});
                                           }
                                       }}

                                       getSelectedLocation={(value) => this.getSelectedLocation(value)}>
                                   </LocationPage>);
                           }
                       }}

                       configureScene={(route, routeStack) =>
                           Navigator.SceneConfigs.FloatFromRight}
            />
        );
    }
}

export default App;
