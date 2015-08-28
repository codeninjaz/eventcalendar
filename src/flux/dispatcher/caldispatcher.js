var Dispatcher = require('flux').Dispatcher;

class CalDispatcher extends Dispatcher{
    handleAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

let _CalDispatcher = new CalDispatcher();

export default _CalDispatcher;
