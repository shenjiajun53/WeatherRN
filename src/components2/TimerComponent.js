require('../App.css');

import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';


class TimerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isTimerRunning: false
        };
        this.trick = this.trick.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
    }

    componentDidMount() {
        // this.timer = setInterval(() => this.trick(), 1000);
        this.timer = setInterval(this.trick, 1000);
        this.setState({
            isTimerRunning: true
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({
            isTimerRunning: false
        })
    }

    trick() {
        this.setState(
            {
                date: new Date()
            }
        );
    }

    toggleTimer() {
        this.setState((prevState) => ({
            isTimerRunning: !prevState.isTimerRunning
        }));
        console.debug("isTimerRunning=" + this.state.isTimerRunning);
        if (this.state.isTimerRunning) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(this.trick, 1000);
        }
    }

    // startTimer() {
    //     this.timer = setInterval(() => this.trick(), 1000);
    //     this.setState({
    //         isTimerRunning: true
    //     });
    //     console.debug("startTimer");
    // }
    //
    // stopTimer() {
    //     clearInterval(this.timer);
    //     this.setState({
    //         isTimerRunning: false
    //     });
    //     console.debug("stopTimer");
    // }

    render() {
        return (
            <div className="notice" onClick={this.toggleTimer}>
                现在时间是{this.state.date.toLocaleTimeString()}
            </div>
        );
    }
}

TimerComponent.defaultProps = {};
export default TimerComponent;
