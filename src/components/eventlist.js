import React         from 'react';
import _             from 'lodash';
import EventListItem from './eventlistitem';

export default class EventList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listOfEvents: [],
        }
    }

    getEvents(nextProps) {
        let appstate = nextProps.appstate;
        let list = [];
        appstate.filteredEvents.forEach((event) => {
            list.push(
                <EventListItem appstate={appstate} key={event.id} event={event} selected={appstate.markedEvent === event}/>
            );
        });
        this.setState({
            listOfEvents: list
        });
    }

    componentWillReceiveProps(nextProps) {
        this.getEvents(nextProps);
    }

    getCatNames() {
        let appstate = this.props.appstate;
        if (appstate.categories && appstate.categories.length > 0) {
            return appstate.categories.join(',');
        }
        return '';
    }

    render() {
        return (
            <div className="event-list">
                <h2>Kommande {this.state.listOfEvents.length} händelser</h2>
                <ul>
                    {this.state.listOfEvents}
                </ul>
            </div>
        );
    }
}
