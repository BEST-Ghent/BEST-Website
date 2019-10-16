var API_KEY = 'AIzaSyBmLSsecQmN5wKP2X7x78RfNnsTILc_ETE';
// number of events to display at a time
var numberOfEvents = 5;
var calendar = {};

function handleClientLoad() {
    gapi.client.setApiKey(API_KEY)
    gapi.client.load('calendar', 'v3', getCalendar);
}

function getCalendar() {
    var timeMin = new Date().toISOString();
    gapi.client.calendar.events.list({
        'calendarId': "5bgthi7odqdrqn03inffum4hhs@group.calendar.google.com",
        'singleEvents': 'true',
        'timeMin': timeMin,
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
            html += "<p><strong>No more upcomming events!</strong></p>";
            break;
        }
    }
    html += "</ul>"
    document.getElementById("calendarList").innerHTML = html;
}

function toHTML(event){
    var fullDay = false;
    var start;
    if(event.start.dateTime){
        start = event.start.dateTime;
        fullDay = false;
    } else {
        start = event.start.date;
        fullDay = true;
    }
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
