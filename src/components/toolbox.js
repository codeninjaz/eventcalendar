import React      from 'react';
import Moment     from 'moment';
import ArrowRight from '../images/right-arrow.png';
import ArrowLeft  from '../images/left-arrow.png';
import Action     from '../flux/actions/calactions'

export default class Toolbox extends React.Component{
    hanldeClick(a) {
        Action.toolboxClick({direction:a});
    }
    render() {
        return (
            <div className="toolbox">
                <div className="controls">
                    <i className="fa fa-pencil-square-o edit-button" onClick={this.hanldeClick.bind(this, 'add')}></i>
                    <img src={ArrowLeft} className="arrow-left" onClick={this.hanldeClick.bind(this, 'left')} />
                    <img src={ArrowRight} className="arrow-right" onClick={this.hanldeClick.bind(this, 'right')} />
                    <div className="month-title">{Moment(this.props.currentDate).format('MMMM YYYY')}</div>
                </div>
            </div>
        );
    }

}
