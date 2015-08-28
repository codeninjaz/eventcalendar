import q from 'q';

function getEvents(pageId) {
    let deferred = q.defer();
    let _this = this;
    let apiUrl = `/api/calendar/events/${pageId}`;
    if (pageId === '0') { //For dev environment
        apiUrl = `http://localhost:8080/api/calendar/events/${pageId}`;
    }
    $.get(apiUrl)
         .done(function(data) {
             deferred.resolve(data);
         })
         .fail(function(msg) {
             deferred.reject('getEvents - ERROR:' + msg);
         });
    return deferred.promise;
};

function getCategories(pageId) {
    let deferred = q.defer();
    let _this = this;
    let categoryApiUrl = `/api/calendar/categories/${pageId}`;
    if (pageId === '0') { //For dev environment
        categoryApiUrl = `http://localhost:8080/api/calendar/categories/${pageId}`;
    }
    $.get(categoryApiUrl)
         .done(function(data) {
             deferred.resolve(data);
         })
         .fail(function(msg) {
             deferred.reject(`getCategories - ERROR: ${msg}`);
         });
    return deferred.promise;
}
function handleSave(data, parentId) {
    let deferred = q.defer();
    let formData = new FormData();
    let apiUrl = '/api/calendar/events/add';
    if (parentId === '0') { //For dev environment
        apiUrl = 'http://localhost:8080/api/calendar/events/add';
    }
    data.parentId = parentId;
    formData.append('event', JSON.stringify(data));
    let files = $('input[type=file]')[0].files;
    $.each(files, function(key, value) {
        formData.append(key, value);
    });
    $.ajax({
            url         : apiUrl,
            type        : 'POST',
            data        : formData,
            cache       : false,
            processData : false,
            contentType : false,
        })
        .done(function(returnData) {
            console.log('handleSave - returnData', returnData);
            deferred.resolve(returnData);
        })
        .fail(function(data) {
            console.log('handleSave - ERROR - data', data);
            deferred.reject(data.responseText);
        });
    return deferred.promise;
}

export default {
    fetch: (id) => {
        let fetchedData = {};
        let deferred = q.defer();
        getEvents(id)
            .then(function(events) {
                fetchedData.events = events;
            })
            .then(
                getCategories(id)
                    .then(function(categories) {
                        fetchedData.categories = categories;
                    })
            )
            .fail(function(error) {
                console.error(error);
            })
            .done(function() {
                    deferred.resolve(fetchedData)
                }
            );
        return deferred.promise;
    },

    save: (data, parentId) => {
        return handleSave(data, parentId);
    }
}
