import Moment        from 'moment';
import CalDispatcher from '../dispatcher/caldispatcher';
import CalConstants  from '../constants/calconstants';
import CalApi        from '../apicalls/calapi';

export default {
    fetch: (id) => {
        CalApi.fetch(id).then((events) => {
            CalDispatcher.handleAction({
                type: CalConstants.FETCH,
                data: events
            })
        })
    },
    save: (data, parentId) => {
        CalApi.save(data, parentId).then((events) => {
            CalDispatcher.handleAction({
                type: CalConstants.SAVED,
                data: events
            })
        })
    },
    dayboxClick: (dayBox) => {
        CalDispatcher.handleAction({
                type: CalConstants.DAYBOXCLICK,
                data: {
                    clickedDay: Moment(dayBox.props.day).valueOf()
                }
            });
    },
    enterEditMode: (info) => {
        CalDispatcher.handleAction({
            type: CalConstants.ENTEREDITMODE,
            data: info
        })
    },
    leaveEditMode: (info) => {
        CalDispatcher.handleAction({
            type: CalConstants.LEAVEEDITMODE,
            data: info
        })
    },
    saveNewEvent: () => {
        CalDispatcher.handleAction({
            type: CalConstants.SAVENEWEVENT
        })
    },
    saveEvent: (event) => {
        CalDispatcher.handleAction({
            type: CalConstants.SAVEEVENT,
            data: event
        })
    },
    categoryClick: (catName) => {
        CalDispatcher.handleAction({
            type: CalConstants.CATEGORYCLICK,
            data: {
                catName: catName
            }
        })
    },
    toolboxClick: (data) => {
        CalDispatcher.handleAction({
            type: CalConstants.TOOLBOXCLICK,
            data: data
        })
    },
    hideInfo: () => {
        CalDispatcher.handleAction({
            type: CalConstants.HIDEINFO
        })
    },
    filterEvents: () => {
        CalDispatcher.handleAction({
            type: CalConstants.FILTEREVENTS
        })
    },
    errorMessage: (message) => {
        CalDispatcher.handleAction({
            type: CalConstants.ERRORMESSAGE,
            data: {
                message: message
            }
        })
    },
    handleEditForm: (id, value) => {
        CalDispatcher.handleAction({
            type : CalConstants.HANDLEEDITFORM,
            data : {
                id    : id,
                value : value
            }
        })
    },
    toggleImageBox: () => {
        CalDispatcher.handleAction({
            type : CalConstants.TOGGLEIMAGEBOX
        })
    },
    hideMessage: () => {
        CalDispatcher.handleAction({
            type : CalConstants.HIDEMESSAGE
        })
    }
}
