/**
 * Created by shenjj on 2016/12/1.
 */
import React from 'react'

class InputItem extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    handleChange(event) {
        this.props.onLocalChange(event.target.value);
        // console.debug("on change");
    }

    render() {
        return (
            <div>
                <input value={this.props.value} onChange={(event) => this.handleChange(event)}/>
            </div>
        );
    }
}

class SyncInputGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleWholeChange(newValue) {
        this.setState({
            value: newValue
        })
    }

    render() {
        return (
            <div>
                <InputItem value={this.state.value} onLocalChange={(newValue) => this.handleWholeChange(newValue)}/>
                <InputItem value={this.state.value} onLocalChange={(newValue) => this.handleWholeChange(newValue)}/>
            </div>
        );
    }

}


export default SyncInputGroup;