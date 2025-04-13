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

function errorLoading() {
    // TODO 
}
