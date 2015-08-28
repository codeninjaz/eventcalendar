import React           from 'react';
import Moment          from 'moment';
import UUID            from 'node-uuid';
import ClassNames      from 'classnames';
import Editor          from 'react-medium-editor';
import Info            from './info';
import Settings        from '../settings';
import Action          from '../flux/actions/calactions'
import DateTimePicker  from 'react-widgets/lib/DateTimePicker';
import Dropdown        from 'react-widgets/lib/DropdownList';
import DTPConfig       from 'react-widgets/lib/configure';
import myDateLocalizer from '../helpers/datelocalizer';

import 'medium-editor/dist/css/medium-editor.css';
import '../styles/geab-editor.scss';
import 'react-widgets/lib/less/react-widgets.less';

Moment.locale(Settings.locale);

DTPConfig.setDateLocalizer(myDateLocalizer);

export default class EventEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.emptyState();
    }
    emptyState() {
      return {
        newEvent: {
            id:       UUID.v4(),
            title:    '',
            start:    Moment().format(Settings.timeFormat),
            stop:     Moment().add(1, 'hour').format(Settings.timeFormat),
            comment:  '',
            image:    '',
            url:      '',
            category: '',
            external: false
        },
        isValid: false,
        message: ''
      }
    }
    handleEditForm(e) {
        let st = this.state;
        let id = e.target.id;
        switch (id){
            case 'title':
                st.newEvent.title = e.target.value;
                break;
            case 'comment':
                st.newEvent.comment = e.target.value;
                break;
            case 'image':
                st.newEvent.image = e.target.value;
                break;
        }
        this.validate(st);
        this.setState(st);
    }
    handleFrom(name, value) {
        try {
            let fromMoment = Moment(new Date(value));
            let st = this.state;
            st.newEvent.start = fromMoment.valueOf();
            if (fromMoment.isAfter(st.newEvent.stop)) {
                st.newEvent.stop = fromMoment.valueOf();
            }
            this.validate(st);
            this.setState(st);
        }catch (err) {
            console.error(err);
            Action.errorMessage(err);
        }
    }
    handleTo(name, value) {
        try {
            let toMoment = Moment(new Date(value));
            let st = this.state;
            st.newEvent.stop = toMoment.valueOf();
            if (toMoment.isBefore(st.newEvent.start)) {
                st.newEvent.start = toMoment.valueOf();
            }
            this.validate(st);
            this.setState(st);
        }catch (err) {
            console.error(err);
            Action.errorMessage(err);
        }
    }
    setExternal(e) {
        let st = this.state;
        st.newEvent.external = e.target.checked;
        this.setState(st);
    }
    setCategory(value) {
        let st = this.state;
        st.newEvent.category = value;
        this.validate(st);
        this.setState(st);
    }
    handleComment(value) {
        let st = this.state;
        st.newEvent.comment = value;
        this.setState(st);
    }
    handleSave() {
      this.setState(this.emptyState());
      Action.save(this.state.newEvent, this.props.appstate.parentId)
    }
    handleCancel() {
      this.setState(this.emptyState());
      Action.leaveEditMode();
    }
    componentWillReceiveProps(nextProps) {
        let st =this.state;
        st.newEvent.category = nextProps.appstate.selectedCategory;
        this.setState(st);
    }

    validate(state) {
        state.isValid = state.newEvent.category && state.newEvent.title;
        state.message = 'Du måste ange en titel och välja en kategori.';
        if (!state.isValid) {
            return state
        } else {
            state.isValid = state.newEvent.category.length > 0 && state.newEvent.title.length > 0
        }
        return state;
    }
    getMessage() {
        let st = this.state;
        if (st.isValid) {
            return null;
        }
        return (
            <div style={{color:'red', fontWeight:'bold'}}>
                {st.message}
            </div>
            );
    }
    render() {
      console.log('State', this.state);
        let classes = ClassNames({
            'eventeditor': true
        });
        return (
            <div className={classes} >
                {this.getMessage()}
                <div className="editor-buttons">
                    <button value="spara" disabled={!this.state.isValid} onClick={this.handleSave.bind(this)}>Spara</button>
                    <button value="avbryt" onClick={this.handleCancel.bind(this)}>Avbryt</button>
                </div>
                <div className="editor-field">
                    <label htmlFor="title">Titel: </label>
                    <input type="text" id="title" name="title" value={this.state.newEvent.title} onChange={this.handleEditForm.bind(this)} />
                </div>
                <div className="editor-field">
                    <label htmlFor="external">Extern: </label>
                    <input id="external" name="external" type="checkbox" onChange={this.setExternal.bind(this)} />
                </div>
                <div className="editor-categories">
                    <label htmlFor="title">Kategori: </label>
                    <Dropdown defaultValue={this.state.newEvent.category} data={this.props.appstate.categories} onChange={this.setCategory.bind(this)}/>
                </div>
                <div className="editor-field">
                    <span>Från datum: </span>
                    <div>
                        <DateTimePicker
                            defaultValue={Moment(this.props.appstate.currentDate).toDate()}
                            onChange={this.handleFrom.bind(this, 'from')}
                            format={'YYYY-MM-DD HH:mm'}
                            step = {15}
                        />
                    </div>
                </div>
                <div className="editor-field">
                    <label htmlFor="stopdate">Till datum: </label>
                    <div>
                        <DateTimePicker
                            defaultValue={Moment(this.props.appstate.currentDate).clone().add(1, 'hour').toDate()}
                            onChange={this.handleTo.bind(this, 'to')}
                            format={'YYYY-MM-DD HH:mm'}
                            step = {15}
                        />
                    </div>
                </div>
                <div className="editor-image">
                    <label htmlFor="image">Bild: </label>
                    <input type="file" id="image" name="image" />
                </div>
                <div className="editor-tb">
                    <label htmlFor="comment">Text: </label><br/>
                    <Editor
                        className="kalender-editor"
                        text={this.state.newEvent.comment}
                        onChange={this.handleComment.bind(this)}
                        options={{
                            buttons: ['bold', 'italic', 'underline', 'quote'],
                            placeholder: {
                                text: ''
                            },
                            autoLink: true
                        }}
                    />
                </div>
           </div>
            );
    }
}

EventEditor.propTypes = {
    showMe       : React.PropTypes.bool,
    category     : React.PropTypes.string,
    clickedDates : React.PropTypes.object
};
