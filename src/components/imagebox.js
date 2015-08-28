import React      from 'react';
import Action     from '../flux/actions/calactions';

function getWindowSize() {
    return {
        X: window.innerWidth,
        Y: window.innerHeight
    }
}

function getMeta(url) {
    var img = new Image();
    img.onLoad = function() {
        let size = {
            w: this.width,
            h: this.height
        }
        return size;
    }
    img.src = url;
}

export default class Info extends React.Component{
    handleClose(e) {
        e.stopPropagation();
        e.preventDefault();
        Action.toggleImageBox();
    }
    render() {
        let windowSize = getWindowSize();
        let imageSize = getMeta(this.props.src);
        let ratio = this.props.width / imageSize.w;
        let height = imageSize.h * ratio;
        let shaderStyle = {
            position:'fixed',
            top:0,
            left:0,
            width:windowSize.X + 'px',
            height:windowSize.Y + 'px',
            opacity:0.5,
            backgroundColor:'#333',
            zIndex: 100000
        };
        let imageStyle = {
            position: 'fixed',
            width: this.props.width,
            height: height,
            left: windowSize.X / 2 - this.props.width / 2,
            top: windowSize.Y / 2 - height / 2,
            opacity: 1,
            zIndex: shaderStyle.zIndex + 1,
            border: 'solid 1px #FFF',
        };
        return (
            <div>
                <div style={shaderStyle} onClick={this.handleClose.bind(this)}></div>
                <img style={imageStyle} src={this.props.src} onClick={this.handleClose.bind(this)} />
            </div>
        );
    }
}

Info.propTypes = {
    width: React.PropTypes.number.isRequired,
    src: React.PropTypes.string.isRequired
};
