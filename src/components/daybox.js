import React      from 'react';
import Moment     from 'moment';
import _          from 'lodash';
import ClassNames from 'classnames';
import Settings   from '../settings';
import Helpers    from '../helpers';
import Action     from '../flux/actions/calactions'

Moment.locale(Settings.locale);

export default class DayBox extends React.Component{
	constructor(props) {
        super(props);
        this.isMarked = false;
        this.state = {
            displayPopUp: 'none',
        };
    }

    handleClick(other) {
        if (!other) {
            Action.dayboxClick(this);
        }
    }

    componentWillMount() {
        let markedEvent = this.props.appstate.markedEvent;
        this.isMarked = Helpers.isInSpan(markedEvent.startlow, markedEvent.stophigh, this.props.day);
    }

    render() {
        let _this = this;
        let dayToShow = Moment(this.props.day);
        let isToday = function() {
            return dayToShow.isSame(Moment(), 'day');
        };
        let isOtherMonth = dayToShow.month() !== _this.props.currentMonth;

        let dailyEvents = Helpers.getEventsByDay(this.props.appstate.filteredEvents, dayToShow.valueOf());
        let hasEvent = dailyEvents.length > 0 &&
            !isToday() &&
            !isOtherMonth &&
            !this.props.selected &&
            !this.isMarked  &&
            !this.props.isstartday &&
            !this.props.isstopday;

        let isExternal = false;
        _.forEach(dailyEvents, function(event) {
            isExternal = event.external;
        });
        let boxClasses = ClassNames({
            'daybox'            : true,
            'today'             : isToday(),
            'selected'          : this.props.selected && !isOtherMonth,
            'disable'           : isOtherMonth,
            'has-event-internal': hasEvent && !isExternal,
            'has-event-external': hasEvent && isExternal,
            'marked'            : this.isMarked && !this.props.selected
        });
        let dayClasses = ClassNames({
            'date-number': true,
            'sunday' : dayToShow.day() === 0
        });
        let weekNum = null;
        if (dayToShow.day() === 1) {
            weekNum = (
                <div className="week-number">v.{this.props.weeknum}</div>
                );
        }
        let dateNumber = function() {
            if (!isOtherMonth) {
                return (
                    <div className={dayClasses}>{dayToShow.format('D')}</div>
                    );
            }
            return null;
        };
        return (
            <div className={boxClasses} key={dayToShow} onClick={this.handleClick.bind(this, isOtherMonth)}>
                {dateNumber()}
            </div>
        );
    }

}

DayBox.propTypes = {
    currentMonth: React.PropTypes.number.isRequired,
    selected    : React.PropTypes.bool,
};
