import React from 'react';
import _     from 'lodash';

export default class PopUp extends React.Component {
    render() {
        let myStyle = {
            position: 'absolute',
            bottom: this.props.x,
            left: this.props.y,
            display: this.props.visible
        };
        let textRows = [];
        _.each(this.props.info, function(info) {
            textRows.push(<li key={info.eventId}>{info.title}</li>);
        });
        return (
            <div className="popup" style={myStyle}>
                <ul>
                    {textRows}
                </ul>
            </div>
        );
    }
 }

PopUp.propTypes = {
    info: React.PropTypes.array.isRequired
};
