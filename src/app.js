import React       from  'react';
import CalendarApp from  './components/calendarapp';

import './styles/style.scss';

class App extends React.Component {
    render() {
        return (
            <CalendarApp  />
        );
    }

}

let rootInstance = React.render((new App()).render(), document.getElementById('calendar'));

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
            return [rootInstance];
        }
    })
}
