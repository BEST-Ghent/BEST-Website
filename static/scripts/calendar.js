var API_KEY = 'AIzaSyBmLSsecQmN5wKP2X7x78RfNnsTILc_ETE';
// number of events to display at a time
var numberOfEvents = 3;
var calendar = {};

function handleClientLoad() {
    gapi.client.setApiKey(API_KEY)
    gapi.client.load('calendar', 'v3', getCalendar);
}

function getCalendar() {
    var timeMin = new Date().toISOString();
    gapi.client.calendar.events.list({
        'calendarId': "7jfkdjs4s3mqru71uqq7ef0750@group.calendar.google.com",
        'singleEvents': 'true',
        'timeMin': timeMin,
        'fields': 'items(description,location,start,end,summary)',
        'orderBy': 'startTime'
    }).then(setCalendar, errorLoading);
}

function setCalendar(feed) {
    loadCalendar(feed);
}

function loadCalendar(feed) {
    events = feed.result.items;
    var html = "<ul style='list-style: none; padding-left: 0;'>";
    for (var i = 0; i < Math.min(events.length, numberOfEvents); i++) {
        html += toHTML(events[i]);
    }
    html += "</ul>"
    document.getElementById("calendarList").innerHTML = html;
}

function dateToDay(date) {
    return date.toLocaleDateString(["en"], { day: "numeric", month: "long"});
}
function dateToHour(date) {
    return date.toLocaleTimeString(["en"], {hour: "2-digit", minute: "2-digit"});
}
function dateToTime(date) {
    return date.toLocaleString(["en"], { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"});
}

function getStartTime(event) {
    if(event.start.dateTime){
        return new Date(event.start.dateTime);
    }
    return new Date(event.start.date);
}
function getEndTime(event) {
    if (event.end.dateTime){
        return new Date(event.end.dateTime);
    }
    return new Date(event.end.date);
}
function isFullDayEvent(event) {
    if (event.start.dateTime) {
        return false;
    }
    return true;
}

function toHTML(event){
    var fullDay = isFullDayEvent(event);
    var start = getStartTime(event);
    var end = getEndTime(event);
    var html = "<li>";
    html += "<strong>" + event.summary + "</strong><br>";
    html += "<p>" + (fullDay ? dateToDay(start) : dateToTime(start));
    if(event.location) {
        html += "<br>Location: " + event.location.split(',')[0];
    }
    if (event.description) {
        html += "<br>" + event.description;
    }
    html += "</p></li>";
    return html;
}

function errorLoading() {
    // TODO 
}
