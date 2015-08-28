import React     from 'react';
import Moment    from 'moment';
import WeekRow   from './weekrow';
import DayLabels from './daylabels';
import Toolbox   from './toolbox';
import Settings  from '../settings';
import _         from 'lodash';

Moment.locale(Settings.locale);

export default class Month extends React.Component{
    constructor(props) {
        super(props);
        this.currentDays = [];
    }
    getDates() {
        let _this = this;
        return {
            currentDay: Moment(_this.props.date),
            startDay: _this.props.startDate,
            endDay: _this.props.stopDate
        };
    }
    getCurrentDays() {
        this.currentDays = [];
        let _this = this;
        let dates = this.getDates();
        let diff = Moment(dates.endDay).diff(dates.startDay, 'days');
        for (let n = 0; n <= diff; n++) {
            //Kolla att det är samma format på datum i listan som i Settings.dayFormat
            let myDay = Moment(dates.startDay).add(n, 'days').format(Settings.dayFormat);
            let d = _.filter(_this.props.days, function(day) {
                return day.day === myDay;
            });
            if (d) {
                this.currentDays.push({
                    day: myDay,
                    events:d
                });
            }
        }
    }

    getEventsBetween(start, stop) {
        let list = _.filter(this.props.events, function(ev) {
            return ev.start > start && ev.start <= stop || ev.stop > start && ev.stop <= stop;
        });
        return list;
    }

    render() {
        let weekNodes = [];
        let dates = this.getDates();
        for (let dayInWeek = Moment(dates.startDay); dayInWeek <= dates.endDay; dayInWeek.add(1, 'weeks')) {
            let weekStartDay = dayInWeek.valueOf();
            let weekStopDay  = dayInWeek.clone().add(6, 'day').valueOf();
            let weekDays = _.filter(this.currentDays, function(item) {
                return Moment(item.day).isBetween(weekStartDay.clone().subtract(1, 'day'), weekStopDay);
            });
            weekNodes.push(
                <WeekRow
                    appstate = {this.props.appstate}
                    weekStartDay = {weekStartDay}
                    weekStopDay  = {weekStopDay}
                    currentMonth = {dates.currentDay.month()}
                    key          = {dayInWeek.toISOString()}
                    currentDays  = {weekDays}
                >
                </WeekRow>
            );
        }
        return (
            <div className="month-box">
                <Toolbox appstate={this.props.appstate} currentDate={this.props.date} />
                <DayLabels />
                <div className="month" onClick={this.props.handleClick}>
                    {weekNodes}
                </div>
            </div>
        );
    }

}

Month.propTypes = {
        appstate     : React.PropTypes.object.isRequired,
        date         : React.PropTypes.string.isRequired,
        startDate    : React.PropTypes.number.isRequired,
        stopDate     : React.PropTypes.number.isRequired,
        events       : React.PropTypes.array.isRequired,
        selectedDate : React.PropTypes.number,
    };
