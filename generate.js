import Moment           from 'moment';
import FS               from 'fs';
import Categories       from './src/dummydata/categoryData.json';

let numberToGenerate = 300;
let timespan         = 1000; //Dagar vi ska generera events för hälften framåt och hälften bakåt i tiden

let lorem = 'Receding boy denim tank-traps artisanal drone bicycle sunglasses smart- cardboard hotdog neural into. ';
lorem += 'Boy crypto- cyber- into range-rover DIY tiger-team office assault claymore mine boat euro-pop. ';
lorem += 'Construct Kowloon weathered tube bridge -space nodal point geodesic. San Francisco footage vehicle ';
lorem += 'disposable denim faded shrine refrigerator plastic narrative RAF neural vinyl military-grade Shibuya.';
lorem = lorem.split(' ');

Moment.locale('sv');

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomDate() {
    return Moment()
        .add(getRandom(-30, timespan), 'day')
        .add(getRandom(-23, 23), 'hour')
        .add(getRandom(-59, 59), 'minute');
}
function randomBoolean() {
    return getRandom(0, 1) === 1;
}
function randomSentence(min, max) {
    let sentenceArray = [];

    for (let n = 0; n < getRandom(min, max); n++) {
        sentenceArray.push(lorem[getRandom(0, lorem.length - 1)]);
    }
    return sentenceArray.join(' ');
}
function getRandomCat() {
    return Categories[getRandom(0, Categories.length - 1)];
}
function generateItem(info) {
    let item = {
            id        : info.n,
            category  : getRandomCat(),
            title     : randomSentence(1, 10),
            start     : info.time1,
            startlow  : Moment(info.time1).hour(0).minute(0).valueOf(),
            stop      : info.time2,
            stophigh  : Moment(info.time2).hour(23).minute(59).valueOf(),
            external  : randomBoolean(),
            comment   : randomSentence(10, 300),
            thumbnail : 'http://lorempixel.com/200/200/',
            image     : 'http://lorempixel.com/800/800/',
            url       : '',
        };
    return item;
}

function getTimes() {
    let rDate = randomDate();
    let time2 = rDate.clone().add(getRandom(30, 7 * 24 * 60), 'minute');
    return {
        rDate : rDate.valueOf(),
        time2 : time2.valueOf(),
        diff  : Moment(time2).hour(0).diff(rDate.hour(0), 'days')
    };
}

function writeToFile(events) {
    let filename = './src/dummydata/events.json';
    FS.writeFile(filename, JSON.stringify(events, null, '\t'), function(err) {
        if (err) {
            throw err;
        }
    });
}

function generateEventData() {
    console.log('Categories', Categories);
    let events = [];
    let dates  = [];
    for (let n = 0; n < numberToGenerate; n++) {
        let times = getTimes();
        for (let m = 0; m <= times.diff; m++) {
            dates.push(Moment(times.rDate.valueOf()).add(m, 'days').valueOf());
        }

        events.push(generateItem(
            {
                n     : n,
                time1 : times.rDate.valueOf(),
                time2 : times.time2
            }));
    }

    writeToFile(events);
}

generateEventData();
