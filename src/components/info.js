import React      from 'react';
import Moment     from 'moment';
import ClassNames from 'classnames';
import Settings   from '../settings';
import _          from 'lodash';
import Action     from '../flux/actions/calactions';

export default class Info extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showImage: false
        };
    }
    handleClose(e) {
        Action.hideInfo();
    }
    handleImgClick(e) {
        e.stopPropagation();
        e.preventDefault();
        Action.toggleImageBox();
    }
    render() {
        $('.sidebar').css('height', 'auto');
        let _this = this;
        let eventInfos = [];
        let appstate = this.props.appstate;
        let classes = ClassNames({
            infobox: true,
            'slide-down': this.props.show,
            'slide-up': !this.props.show
        });
        if (this.props.displayEvents) {
            let sorted = _.sortBy(this.props.displayEvents, function(event) {
                return Moment(event.start).unix();
            });
            let closeButton = function(event) {
                if (_this.props.showCloseButton) {
                    return (
                        <div className="close-button-top">
                            <h2>{event.title}</h2>
                            <i className="fa fa-close close-button" onClick={_this.handleClose.bind(_this)}></i>
                        </div>
                    );
                }
                return null;
            };
            _.map(sorted, function(event) {
                let image = event.image ?
                                        <a href={event.image} target="_blank">
                                            <img style={{border:'solid 1px #999'}} src={event.thumbnail}/>
                                        </a>
                                        : null;
                eventInfos.push(
                    <div className="info-inner" key={event.id}>
                        {closeButton(event)}
                        <div>
                           <i className="fa fa-tag"></i> <span style={{textTransform:'capitalize'}}>{event.category}</span><br/>
                           <i className="fa fa-clock-o"></i> {Moment(event.start).format(Settings.dayFormat + ' HH:mm')} - {Moment(event.stop).format(Settings.dayFormat + ' HH:mm')}
                        </div>
                        <div>
                            {image}
                            <p className="comment" dangerouslySetInnerHTML={{__html: event.comment}}></p>
                        </div>
                        <div className="clear"></div>
                    </div>
                );
            });
            return (
                    <div className={classes}>
                        {eventInfos}
                    </div>
                );
        } else {
            return (
                <div />
            );
        }
    }

}

Info.propTypes = {
    show: React.PropTypes.bool.isRequired,
    showCloseButton: React.PropTypes.bool,
    appstate: React.PropTypes.object.isRequired,
    displayEvents: React.PropTypes.array.isRequired,
};

Info.defaultProps = {
    showCloseButton: true
};
