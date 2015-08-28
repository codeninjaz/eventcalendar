import React from 'react';
import Action       from '../flux/actions/calactions'

export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.text) {
            return;
        };
        window.setTimeout(function() {
            Action.hideMessage()
        }, this.props.duration)
    }

    render() {
        let style = {
            backgroundColor : '#D4F09C',
            padding         : '10px',
            border          : '1px solid #CCC',
            position        : 'absolute',
            top             : '170px',
            left            : '50px',
            zIndex          : '100000',
            textAlign       : 'center',
            width           : '300px'
        }
        return (
            <div style={style}>
                {this.props.text}
            </div>
        );
    }
}
