import Moment from 'moment';

export default {
    formats: {
        date: 'dd',
        time: 'LT',
        default: 'lll',
        header: 'MMMM YYYY',
        footer: 'L',
        weekday: (day, culture, localizer) => Moment().weekday(day).format('dd'),

        dayOfMonth: 'DD',
        month: 'MMM',
        year: 'YYYY',

        decade: (date, culture, localizer) => {
            return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture)
        },

        century: (date, culture, localizer) => {
            return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture)
        }
    },

    firstOfWeek(culture) {
        return moment.localeData(culture).firstDayOfWeek()
    },

    parse(value, format, culture) {
        return Moment(value).format(format)
    },

    format(value, format, culture) {
        return Moment(value).format(format)
    }
}
