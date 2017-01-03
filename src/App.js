import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import TimerComponent from './components/TimerComponent'
import ListComponent from './components/ListComponent'
import SyncInputGroup from './components/SyncInputGroup'
import MainComponent from './components/MainPage'

class App extends Component {
    render() {
        return (
            <div className="App">
                <MainComponent/>
            </div>
        );
    }
}

export default App;
