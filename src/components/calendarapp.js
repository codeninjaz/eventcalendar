import React          from 'react';
import Calendar       from './calendar';
import Store          from '../flux/stores/calendarstore';
import Action         from '../flux/actions/calactions'

export default class CalendarApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = Store.getState();
    }

    _onChange() {
        this.setState(Store.getState());
    }

    componentDidMount() {
        Store.addChangeListener(this._onChange.bind(this));
        if (!this.state.data) {
            let pageId = $('#calendar').attr('data-id');
            Action.fetch(pageId);
        }

    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <Calendar appstate = {this.state} />
        );
    }

}
