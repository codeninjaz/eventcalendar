import React      from 'react';
import Moment     from 'moment';
import ClassNames from 'classnames';
import Info       from './info';
import Settings   from '../settings';
import Action     from '../flux/actions/calactions'

export default class EventListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        }
    }
    handleClick(name) {
        if ($('.sidebar, #content-area').equalizeHeights) {
            $('.sidebar, #content-area').equalizeHeights();
        }
        this.setState({
            showInfo: !this.state.showInfo
        })
    }
    render() {
        let classes = ClassNames({
            selected: this.props.selected,
            'event-list-item': true
        });
        let event = this.props.event;
        return (
            <li className={classes} style={{userSelect:'none'}} key={event.id} onClick={this.handleClick.bind(this, this)}>
                <span className="item-heading" href={event.url}>{event.title} </span>
                <span className="item-date">
                     <i className="fa fa-tag"></i> <span style={{textTransform:'capitalize'}}>{event.category}</span>&nbsp;&nbsp;&nbsp;<i className="fa fa-clock-o"></i> {Moment(event.start).format(Settings.dayFormat + ' HH:mm')} - {Moment(event.stop).format(Settings.dayFormat + ' HH:mm')}
                </span>
                {this.state.showInfo ?
                    <Info appstate={this.props.appstate} displayEvents={[event]} show={true} showCloseButton={true}/> :
                    null}
            </li>
        );
    }
}

EventListItem.propTypes = {
    appstate: React.PropTypes.object.isRequired,
};
