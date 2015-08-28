import {EventEmitter} from 'events';
import Moment         from 'moment';
import CalConstants   from '../constants/calconstants';
import Dispatcher     from '../dispatcher/caldispatcher';
import Settings       from '../../settings';
import Helpers        from '../../helpers';
import CalAppState    from '../../helpers/calendarappstate';
import 'babel-core/polyfill';

let theAppState = CalAppState;

let savedCategories = [];

function clickADay(clickedDay) {
    let cds = theAppState.clickedDates;
    cds = {
        selectedDate : 0,
        startEditDate: 0,
        stopEditDate : 0
    };
    if (Moment(clickedDay).isSame(theAppState.selectedDate, 'day')) {
        theAppState.clickedDates  = cds,
        theAppState.displayEvents = [],
        theAppState.showInfo      = true
    } else {
        let todaysEvents = Helpers.getEventsByDay(theAppState.filteredEvents, Moment(clickedDay).valueOf());
        cds.selectedDate = clickedDay;
        theAppState.clickedDates  = cds;
        theAppState.displayEvents = todaysEvents;
        theAppState.showInfo      = todaysEvents.length > 0;
    }
    if (!Moment(clickedDay).isSame(theAppState.currentDate, 'month')) {
        theAppState.currentDate = clickedDay;
        theAppState.showInfo    = true;
    }
}

function filterEvents(events, cats) {
    var theseEvents = _.sortBy(filterEventsOnCategories(events, cats), function(ev) {
        return ev.start;
    });
    return theseEvents;
}

function filterEventsOnCategories(events, categories) {
    if (!categories || categories.length === 0) {
        return events;
    }
    var list = [];
    _.each(events, function(ev) {
        if (_.includes(categories, ev.category) || !ev.category) {
            list.push(ev);
        }
    });
    return list;
}

function catClick(catName) {
    var cats    = theAppState.selectedCategories;
    if (!cats) {
        cats = [];
    }
    if (catName) {
        if (!_.includes(cats, catName)) {
            cats.push(catName);
        }else {
            _.pull(cats, catName);
        }
    } else {
        cats = _.reject(cats, function(c) {
                return c === catName;
            });
    }
    theAppState.filteredEvents = filterEvents(theAppState.events, cats)
  }

function handleAdd() {
    if (theAppState.editmode) {
        theAppState.selectedCategories = savedCategories,
        theAppState.editmode           = false,
        theAppState.clickedDates       = {
            selectedDate : 0,
            startEditDate: 0,
            stopEditDate : 0
        }
    }else {
        savedCategories                = theAppState.selectedCategories;
        theAppState.selectedCategories = [],
        theAppState.editmode           = true,
        theAppState.clickedDates       = {
            selectedDate  : 0,
            startEditDate : Moment().valueOf(),
            stopEditDate  : Moment().valueOf()
        }
    }
}

function toolboxClick(direction) {
    var n = 0;
    if (direction === 'home') {
        this.setState({
                currentDate : Moment()
            });
        return;
    }
    if (direction === 'add') {
        handleAdd();
        return;
    }
    switch (direction) {
        case 'right':
            n = 1;
            break;
        case 'left':
            n = -1;
            break;
        case 'rightx2':
            n = 12;
            break;
        case 'leftx2':
            n = -12;
            break;
    }
    theAppState.currentDate = Moment(theAppState.currentDate).add(n, 'month').format(),
    theAppState.displayEvents = []
}

export class CalendarStore extends EventEmitter {
    getState() {
        return theAppState;
    }

    emitChange() {
        this.emit('CHANGE');
    }

    addChangeListener(cb) {
        this.on('CHANGE', cb);
    }

    removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
    }
}

let _CalendarStore = new CalendarStore();

export default _CalendarStore;

Dispatcher.register((payload) => {
    let action = payload.action;
    let data = action.data;
    switch (action.type) {
        case CalConstants.FETCH:
            theAppState.events         = data.events;
            theAppState.categories     = data.categories;
            theAppState.filteredEvents = filterEvents(data.events, []);
            break;
        case CalConstants.SAVED:
            theAppState.events         = data;
            theAppState.editmode       = false;
            theAppState.filteredEvents = filterEvents(data, []);
            theAppState.message        = Settings.savedMessage;
            break;
        case CalConstants.HIDEMESSAGE:
            theAppState.message = '';
            break;
        case CalConstants.DAYBOXCLICK:
            clickADay(data.clickedDay);
            break;
        case CalConstants.ENTEREDITMODE:
            theAppState.selectedCategories = [],
            theAppState.editmode           = true,
            theAppState.clickedDates       = {
                selectedDate : 0
            }
            break;
        case CalConstants.LEAVEEDITMODE:
            theAppState.selectedCategories = savedCategories,
            theAppState.editmode           = false,
            theAppState.clickedDates       = {
                selectedDate:  0,
                startEditDate: 0,
                stopEditDate:  0
            }
            break;
        case CalConstants.CATEGORYCLICK:
            catClick(data.catName);
            break;
        case CalConstants.TOOLBOXCLICK:
            toolboxClick(data.direction);
            break;
        case CalConstants.HIDEINFO:
            theAppState.showInfo = false;
            break;
        case CalConstants.HANDLEEDITFORM:
            handleEditForm(data.id, data.value);
            break;
        case CalConstants.HANDLEEDITFROM:
            theAppState.newEvent.start = data.value;
            break;
        case CalConstants.HANDLEEDITTO:
            theAppState.newEvent.stop = data.value;
            break;
        case CalConstants.HANDLEEDITCOMMENT:
            theAppState.newEvent.comment = data.value;
            break;
        case CalConstants.ERRORMESSAGE:
            theAppState.feedback = data.message;
            break;
        case CalConstants.FILTEREVENTS:
            theAppState.filteredEvents = filterEvents(theAppState.events, theAppState.categories);theAppState
            break;
        case CalConstants.TOGGLEIMAGEBOX:
            theAppState.showImageBox = !theAppState.showImageBox;
            break;
    }
    _CalendarStore.emitChange();
});
