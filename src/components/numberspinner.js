import React      from 'react';
import ClassNames from 'classnames';
import Settings   from '../settings';
import PubSub     from 'pubsub-js';

export default class NumberSpinner extends React.Component {
    constructor(props) {
        this.spinit = '';
        super(props);
        this.state = {
            value: props.value
        };
    }
    handleSpin(_this, direction) {
        let num = _this.state.value;
        let step = 1;
        if (_this.props.step) {
            step = _this.props.step;
        }
        if (direction === 'up') {
            num += step;
        }
        if (direction === 'down') {
            num -= step;
        }
        if (num > _this.props.max) {
            num = _this.props.min;
        }
        if (num < _this.props.min) {
            num = _this.props.max;
        }
        //TODO: Remove PubSub dependecy
        PubSub.publish(Settings.eventNames.spinnerChange, _this);
        _this.setState({
            value: num
        });
    }
    handleHold(direction) {
        this.spinit = setInterval(this.handleSpin, this.props.interval, this, direction);
    }
    handleRelease() {
        clearInterval(this.spinit);
    }
    render() {
        let padding = this.props.pad;
        let zeros = function() {
            let result = '';
            for (let i = 0; i < padding; i++) {
                result += '0';
            }
            return result;
        };
        let spinnerClasses = ClassNames({
            'numberspinner-arrow-container': true,
            'hide': !this.props.editable
        });
        let value = this.props.value;
        if (this.props.editable) {
            value = this.state.value;
        }
        return (
            <div className={'numberspinner-container ' + this.props.className}>
                <div className="numberspinner-number">
                    {(zeros() + value).substr(-padding, padding)}
                </div>
                <div className={spinnerClasses}>
                    <i className="fa fa-chevron-up"
                         onClick     = {this.handleSpin.bind(this, this, 'up')}
                         onMouseDown = {this.handleHold.bind(this, 'up')}
                         onMouseUp   = {this.handleRelease.bind(this)}
                    ></i>
                    <i className="fa fa-chevron-down"
                        onClick     = {this.handleSpin.bind(this, this, 'down')}
                        onMouseDown = {this.handleHold.bind(this, 'down')}
                        onMouseUp   = {this.handleRelease.bind(this)}
                    ></i>
                </div>
            </div>
        );
    }
}

NumberSpinner.propTypes = {
    value    : React.PropTypes.number.isRequired,
    id       : React.PropTypes.string.isRequired,
    step     : React.PropTypes.number,
    min      : React.PropTypes.number,
    max      : React.PropTypes.number,
    pad      : React.PropTypes.number,
    interval : React.PropTypes.number,
    className: React.PropTypes.string,
    editable : React.PropTypes.bool
};

NumberSpinner.defaultProps = {
    value    : 0,
    step     : 1,
    min      : 0,
    max      : 99,
    pad      : 2,
    interval : 100,
    editable : true
};
