navMainLinks = {
	"Home":"/",
	"About":"/about/",
	"Courses":"/courses/",
	"Sustainability Workshops":"/sustainability-workshops/",
	"Training":"/training/",
	"Partners":"/partners/",
	"Events":"/events/",
	"Contact":"/#contact"
}

// Removes all fouc-barrier classes in the document
function removeFOUCbarriers() {
    let instances = document.getElementsByClassName("fouc-barrier");
	[...instances].forEach(element => { element.classList.remove("fouc-barrier"); });
}

// Creates a fragment from the given htmlStr
function createFragment(htmlStr) {

    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

// Adds any html code into the specified DOM element (for scripts, use addScript to actually load the scripts when they are added)
function addGeneral(element, htmlStr) {
	const fragment = createFragment(htmlStr);
	element.appendChild(fragment);
}

// Adds, loads and runs a script from a given source address
function addScript(element, src) {
	const script = document.createElement('script');
	script.src = src;
	script.async=false;
	element.appendChild(script);
}

// Finds all instances of the indicator class and applies the template to them
function applyTemplate(indicator, template) {
    const instances = document.getElementsByClassName(indicator);
    [...instances].forEach(element => { template(element); element.classList.remove(indicator); });
}

// Once all stylesheets that were added as a template have loaded, this callback will lift the FOUC barrier and show the page
let loadedStyleSheets = 0;
function loadedStylesheetCallback() {
	loadedStyleSheets++;
	
	let instances = document.getElementsByClassName("dynamic-stylesheet")
	let totalStyleSheets = [...instances].length
	if (loadedStyleSheets==totalStyleSheets) {
		removeFOUCbarriers();
	}
}

// This is where all the templates are defined
function applyTemplates() {

    applyTemplate("templates-head",el=>{
		addGeneral(el, `
			<meta name="viewport" content="width=device-width">
			<meta charset="UTF-8">

			<!-- CSS -->
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.7.1/jquery.fullPage.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="/static/stylesheets/fullpage.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="/static/stylesheets/bootstrap.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="/static/stylesheets/style-v1.css">

			<!-- FONTS -->
			<link rel='stylesheet' type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href='https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,700'>
			<link rel='stylesheet' type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href='https://fonts.googleapis.com/css?family=Lato:400,200,700,300'>
			<!-- font awesome icons -->
			<link rel="stylesheet" type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
			
			<!-- ICONS -->
			<link rel="apple-touch-icon" type="image/png" sizes="57x57"   href="/static/media/ico/apple-touch-icon-57x57.png">
			<link rel="apple-touch-icon" type="image/png" sizes="60x60"   href="/static/media/ico/apple-touch-icon-60x60.png">
			<link rel="apple-touch-icon" type="image/png" sizes="72x72"   href="/static/media/ico/apple-touch-icon-72x72.png">
			<link rel="apple-touch-icon" type="image/png" sizes="76x76"   href="/static/media/ico/apple-touch-icon-76x76.png">
			<link rel="apple-touch-icon" type="image/png" sizes="114x114" href="/static/media/ico/apple-touch-icon-114x114.png">
			<link rel="apple-touch-icon" type="image/png" sizes="120x120" href="/static/media/ico/apple-touch-icon-120x120.png">
			<link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/static/media/ico/apple-touch-icon-144x144.png">
			<link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/static/media/ico/apple-touch-icon-152x152.png">
			<link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/static/media/ico/apple-touch-icon-180x180.png">
			<link rel="icon"             type="image/png" sizes="16x16"   href="/static/media/ico/favicon-16x16.png">
			<link rel="icon"             type="image/png" sizes="32x32"   href="/static/media/ico/favicon-32x32.png">
			<link rel="icon"             type="image/png" sizes="96x96"   href="/static/media/ico/favicon-96x96.png">
			<link rel="icon"             type="image/png" sizes="192x192" href="/static/media/ico/android-chrome-192x192.png">
			<link rel="manifest" href="/static/media/ico/manifest.json">
			<link rel="mask-icon" href="/static/media/ico/safari-pinned-tab.svg" color="#0572ba">
			<link rel="shortcut icon" href="/static/media/ico/favicon.ico">
			<meta name="msapplication-TileColor" content="#da532c">
			<meta name="msapplication-TileImage" content="/static/media/ico/mstile-144x144.png">
			<meta name="msapplication-config" content="/static/media/ico/browserconfig.xml">
			<meta name="theme-color" content="#ffffff">
		`);
	});

	applyTemplate("templates-copyright",el=>{
		addGeneral(el, `
			<span>©2020-`+new Date().getFullYear()+` BEST Ghent vzw. All rights reserved.</span>
		`);
	});

	applyTemplate("templates-scripts", el=>{
		addScript(el, "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.7.1/jquery.fullPage.js");
		addScript(el, "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js");
		addScript(el, "/static/scripts/owl-carousel.js");
		addScript(el, "/static/scripts/script-v1.js");
	});

	applyTemplate("templates-nav-main", el=>{
		let desktop = `
		<nav class="navbar navbar-top">
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav" id="nav-top">`;
		for (const link in navMainLinks) {
			desktop += `<li><a href="`+navMainLinks[link]+`"><span>`+link+`</span></a></li>`;
		}
		desktop+= `
				</ul>
			</div>
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=""
					aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
		</nav>`;
		addGeneral(el, desktop);

		let mobile = `
		<nav class="mobilemenu">
        	<div class="menu">
            	<ul class="nav navbar-nav text-center" id="nav-mobile">`;
		for (const link in navMainLinks) {
			mobile += `<li><a href="`+navMainLinks[link]+`"><span>`+link+`</span></a></li>`;
		}
		mobile += `
				</ul>
			</div>
		</nav>`;
		addGeneral(el, mobile);
	});
}

window.addEventListener('pageshow', function (event) {
	applyTemplates();
});