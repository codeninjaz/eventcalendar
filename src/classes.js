class EventInfo {
    constructor(day, eventId, title) {
        this.day     = day;
        this.eventId = eventId;
        this.title   = title;
    }
}

class Event {
    constructor(id, title, start, stop, length, comment, image, url, category) {
        this.id       = id;
        this.title    = title;
        this.start    = start;
        this.stop     = stop;
        this.length   = length;
        this.comment  = comment;
        this.image    = image;
        this.url      = url;
        this.category = category;
    }
}

exports.EventInfo = EventInfo;
exports.Event = Event;
