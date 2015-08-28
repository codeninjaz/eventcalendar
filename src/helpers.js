var _      = require('lodash');

export default {
    isInSpan: function(start, stop, time) {
        return start <= time && stop >= time;
    },
    getEventsByDay: function(events, day) {
        var list = _.filter(events, function(ev) {
            return ev.startlow <= day && ev.stophigh >= day;
        });
        return list;
    }
};
