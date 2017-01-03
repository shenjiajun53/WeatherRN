/**
 * Created by shenjj on 2016/12/1.
 */
import React from 'react';
// import ReactHtml from 'react-native-html';

let names = ["Soap", "Ghost", "Ezio", "Lora"];

const defStyle = {
    listStyle: 'none',
};

class ListComponent extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (

                <div>
                    <ul>
                        {names.map(
                            (name) =>
                                <li
                                    key={name.toString()}
                                    style={defStyle}
                                >
                                    name={name.toString()}
                                </li>
                        )}
                    </ul>
                </div>

        );
    }
}

export default ListComponent;