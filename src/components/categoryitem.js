import React         from 'react';
import ClassNames    from 'classnames';
import PubSub        from 'pubsub-js';
import SelectedBox   from '../images/selected-box.png';
import UnselectedBox from '../images/unselected-box.png';
import Settings      from '../settings';
import Action        from '../flux/actions/calactions'

export default class CategoryItem extends React.Component{
    handleClick() {
        Action.categoryClick(this.props.category);
    }
    selBox() {
        return (
            <img src={this.props.selected ? SelectedBox : UnselectedBox} />
        );
    }
    render() {
        let classes = ClassNames({
            selected: this.props.selected
        });
        return (
            <li key={this.props.category}
                className={classes}
                onClick={this.handleClick.bind(this)}>{this.selBox()} {this.props.category}</li>
        );
    }

}
