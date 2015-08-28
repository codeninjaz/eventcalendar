import React        from 'react';
import Moment       from 'moment';
import PubSub       from 'pubsub-js';
import _            from 'lodash';
import Month        from './month';
import Info         from './info';
import EventEditor  from './eventeditor';
import CategoryList from './categorylist';
import EventList    from './eventlist';
import Message      from './message';
import Settings     from '../settings';
import Helpers      from '../helpers';
import Action       from '../flux/actions/calactions'

React.initializeTouchEvents(true);
Moment.locale(Settings.locale);

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.selectedEvents = [];
        this.savedCategories = [];
        this.filteredEvents = [];
        this.myDay = '';
    }

    render() {
        let appstate       = this.props.appstate;
        let theDate        = Moment(appstate.currentDate).format(Settings.dateFormat);
        let monthStartDate = Moment(theDate).date(0).day(1).valueOf();
        let monthEndDay    = Moment(theDate).add(1, 'month').date(0);
        let monthStopDate  = monthEndDay.clone().day(7);
        let untilEnd       = Moment(monthStopDate).diff(monthEndDay, 'days');
        if (untilEnd >= 7) {
            monthStopDate.subtract(1, 'weeks');
        }
        monthStopDate   = monthStopDate.valueOf();
        let monthEvents = _.filter(appstate.filteredEvents, function(ev) {
            return ev.start > monthStartDate &&
                   ev.start <= monthStopDate ||
                   ev.stop > monthStartDate &&
                   ev.stop <= monthStopDate;
        });
        let editor = null;
        if(appstate.editmode){
          editor = (<EventEditor
                        appstate={appstate}
                        category={appstate.selectedCategory}
                        clickedDates = {appstate.clickedDates}
                    />);
        }

        //monthEvents = this.filterEventsOnCategories(monthEvents,appstate.selectedCategories);
        let theCalendar = (
            <div className="calendar" style={{position: 'relative'}}>
                {appstate.message ? <Message text={appstate.message} duration={5000}/> : null}
                <div className="month-cat">
                    <Month
                        appstate     = {appstate}
                        date         = {theDate}
                        startDate    = {monthStartDate}
                        stopDate     = {monthStopDate}
                        events       = {monthEvents}
                    />
                    <CategoryList appstate = {appstate} />
                </div>
                {editor}
                <Info
                    show={appstate.showInfo}
                    appstate = {appstate}
                    displayEvents={appstate.displayEvents}
                    showCloseButton={true}
                />
                <EventList appstate={appstate} />
            </div>
        );
        return theCalendar;
    }
}
