import React    from 'react';
import Moment   from 'moment';
import DayBox   from './daybox';
import Settings from '../settings';

Moment.locale(Settings.locale);

export default class WeekRow extends React.Component {
	render() {
    let _this        = this;
    let clickedDates = this.props.appstate.clickedDates;
    let dayNodes     = [];

    let d = Moment(this.props.weekStartDay);
    while (Moment(d).valueOf() <= this.props.weekStopDay) {
        let isSelectedDay = Moment(clickedDates.selectedDate).isSame(d, 'day');
        let dM            = Moment(d);
        let dayValue      = dM.valueOf();

        dayNodes.push(
        <DayBox
            day          = {dayValue}
            selected     = {isSelectedDay}
            appstate     = {this.props.appstate}
            currentMonth = {this.props.currentMonth}
            key          = {dayValue}
            weeknum      = {dM.week()}
        />
        );
        d.add(1, 'day');
    }
    return (
        <div className="weekrow" key={this.props.weekDay}>
            {dayNodes}
        </div>
    );
	}
}

WeekRow.propTypes = {
    currentMonth: React.PropTypes.number.isRequired,
    appstate: React.PropTypes.object.isRequired,
};
