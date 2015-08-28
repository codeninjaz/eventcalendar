import React    from 'react';
import Moment   from 'moment';
import Settings from '../settings';

Moment.locale(Settings.locale);

export default class DayLabels extends React.Component {
	render() {
    let theDays = [];
    let myStyle = {
				width:         '60px',
				display:       'inline-block',
				textAlign:     'center',
				textTransform: 'uppercase',
				paddingTop:    '10px',
				paddingBottom: '10px',
				fontSize:      '17px'
    };
    for (let i = 1; i <= 7; i++) {
        theDays.push(
        <span style={myStyle} key={'day-' + i}>{Moment().day(i).format('ddd')}</span>
        );
    }
    return (
        <div key={this.props.weekDay}>
            {theDays}
        </div>
    );
	}
}
