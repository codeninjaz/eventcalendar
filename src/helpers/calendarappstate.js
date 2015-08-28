import Moment   from 'moment';
import Settings from '../settings';

export default {
    events             : [],
    filteredEvents     : [],
    markedEvent        : {},
    categories         : [],
    selectedCategories : [],
    currentDate        : Moment().format(),
    editmode           : false,
    selectedCategory   : null,
    isWaiting          : true,
    showInfo           : false,
    displayPopUp       : 'none',
    feedback           : '',
    showImageBox       : false,
    parentId           : $('#calendar').attr('data-id'),
    clickedDates : {
        selectedDate  : 0
    },
}
