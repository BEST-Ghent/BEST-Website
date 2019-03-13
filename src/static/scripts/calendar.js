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
        html += toHTML(events[i]);
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
    var html = "<li class='text-white'>";
    html += "<div><h6>" + new Date(start).toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" }).toUpperCase() +"</h6></div>";
    html += "<div><strong>" + event.summary + "</strong><br>";
    if(!fullDay) html += "<p>Start: " + new Date(start).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    if(event.location){
        html += "<br>Locatie: " + event.location.split(',')[0];
    }
    html += "</p></div></li>";
    return html;
}

function loadMoreEvents() {
    numberOfEvents += 5;
    loadCalendar(calendar);
}

function errorLoading() {
    //TODO
}
