import React, {Component} from 'react';
import {
    View, Navigator
} from 'react-native';
import MainPage from './components/MainPage'
import LocationPage from './components/LocationPage'

class App extends Component {
    render() {
        return (
            <Navigator style={{flex: 1}}
                       initialRoute={{title: 'My Initial Scene', index: 0}}
                       renderScene={(route, navigator) => {
                           switch (route.index) {
                               case 0:
                                   return (<MainPage
                                       title={route.title}

                                       // Function to call when a new scene should be displayed
                                       onForward={ () => {
                                           const nextIndex = route.index + 1;
                                           navigator.push({
                                               title: 'Scene ' + nextIndex,
                                               index: nextIndex,
                                           });
                                       }}

                                       // Function to call to go back to the previous scene
                                       onBack={() => {
                                           if (route.index > 0) {
                                               navigator.pop();
                                           }
                                       }}/>);
                                   break;
                               case 1:
                                   return (<LocationPage
                                       title={route.title}

                                       // Function to call when a new scene should be displayed
                                       onForward={ () => {
                                           const nextIndex = route.index + 1;
                                           navigator.push({
                                               title: 'Scene ' + nextIndex,
                                               index: nextIndex,
                                           });
                                       }}

                                       // Function to call to go back to the previous scene
                                       onBack={() => {
                                           if (route.index > 0) {
                                               navigator.pop();
                                           }
                                       }}/>);
                                   break;
                           }
                       }}
            />
        );
    }
}

export default App;
