var API_KEY = 'AIzaSyBmLSsecQmN5wKP2X7x78RfNnsTILc_ETE';
// number of events to display at a time
var numberOfEvents = 1;
var calendar = {};

function handleClientLoad() {
    gapi.client.setApiKey(API_KEY)
    gapi.client.load('calendar', 'v3', getCalendar);
}

function getCalendar() {
    var timeMin = new Date().toISOString();
    gapi.client.calendar.events.list({
        'calendarId': "c2e915e68040e8203657764421f897becfb3412cc6736def8a13da222004ec9a@group.calendar.google.com",
        'singleEvents': 'true',
        'timeMin': timeMin, // Gets all events that end after timeMin
        'fields': 'items(description,location,start,summary)',
        'orderBy': 'startTime'
    }).then(setCalendar, errorLoading);
}

function setCalendar(feed) {
    calendar = feed;
    loadCalendar(feed);
}

function loadCalendar(feed) {
    events = feed.result.items;
    var html = "<ul style='list-style: none;'>";
    for (var i = 0; i < numberOfEvents; i++) {
        if (events[i]) {
            html += toHTML(events[i]);
        } else {
            html += "<p><strong>No more upcoming events!</strong></p>";
            break;
        }
    }
    html += "</ul>"
    document.getElementById("calendarList").innerHTML = html;

    var current = new Date();
    let start = getStartTime(events[0]);
    if (start>current) {
        document.getElementById("availability").innerHTML = "<p><strong>AVAILABLE</strong></p>";
    }
    else {
        document.getElementById("availability").innerHTML = "<p><strong>UNAVAILABLE</strong></p>";
    }
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
    var html = "<li>";
    html += "<strong>" + event.summary + "</strong><br>";
    html += "<p>" + new Date(start).toLocaleDateString([], { day: "numeric", month: "long"});
    if(!fullDay) {
        html += "<br>" + new Date(start).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    }
    if(event.location) {
        html += "<br>Location: " + event.location.split(',')[0];
    }
    html += "</p></li>";
    return html;
}

function loadMoreEvents() {
    numberOfEvents += 5;
    loadCalendar(calendar);
}

function errorLoading() {
    // TODO 
}
