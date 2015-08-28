import Restify from 'restify';
import FS from 'fs'

let server = Restify.createServer();

function sendCats(req, res, next) {
    let jsonCats = JSON.parse(FS.readFileSync('./dummydata/categoryData.json', 'utf8'));
    res.send(jsonCats);
    next();
}

function sendEvents(req, res, next) {
    let events = JSON.parse(FS.readFileSync('./dummydata/events.json', 'utf8'));
    res.send(events);
    next();
}

function addEvent(req, res, next) {
    let eventsFile = './dummydata/events.json';
    let events = JSON.parse(FS.readFileSync(eventsFile, 'utf8'));
    console.log('events', events);
    console.log('req.body', req.body);
    let newEvent = JSON.parse(req.body.event);
    console.log('newEvent', newEvent);
    events.push(newEvent);

    FS.writeFile(eventsFile, JSON.stringify(events, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved event ' + eventsFile);
        }
    });
    res.send(events);
    next();
}

server.use(Restify.CORS());
server.use(Restify.fullResponse());
server.use(Restify.bodyParser());

server.get('/api/calendar/categories/:id', sendCats);
server.get('/api/calendar/events/:id', sendEvents);
server.post('/api/calendar/events/add', addEvent);

server.listen(8080, function() {
    console.log(`${server.name} lyssnar på ${server.url}`)
})
