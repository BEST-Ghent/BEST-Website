navMainLinks = {
	"Home":"/",
	"About":"/about",
	"Courses":"/courses",
	"Sustainability Workshops":"/sustainability-workshops",
	"Training":"/training",
	"Partners":"/partners",
	"Events":"/events",
	"Contact":"/#contact"
}

// Removes all fouc-barrier classes in the document
function removeFOUCbarriers() {
    let instances = document.getElementsByClassName("fouc-barrier");
	[...instances].forEach(element => { element.classList.remove("fouc-barrier"); });
}

// Handles the final stages of showing the page, making sure FOUC barriers are lifted at the correct time and animations happen in the correct order.
function finishPageCreation() {

	function updateSectionStyle(prevIndex, nextIndex) {

		const sections = $('.fp-section');
		const prevSection = sections.eq(prevIndex-1);
		const nextSection = sections.eq(nextIndex-1);

		// Move the menu bar down for the first slide (it is down by default, so also move it up for all the other slides)
		if (nextIndex != 1) {
			$('.navbar-sticky').addClass('placement-top');
		}
		else {
			$('.navbar-sticky').removeClass('placement-top');
		}

		// Image sections need the navigation to be white instead of gray
		if (nextSection.hasClass('sec-img')) {
			$('#nav-top').addClass('in-sec-img');
		}
		else {
			$('#nav-top').removeClass('in-sec-img');
		}

		// White sections need the primary color of the navbar to change from white to blue
		if (nextSection.hasClass('sec-white')) {
			$('#nav-top').addClass('in-sec-white');
			$('.icon-bar').css('background-color', 'var(--site-blue)');
		}
		else {
			$('#nav-top').removeClass('in-sec-white');
			$('.icon-bar').css('background-color', '');
		}

	}

	// Initiates the fullpage plugin when there is an element with id="fullpage". If there is no such element, fullpage will not be initialized.
	// This has to happen after jquery is loaded because fullpage requires jquery.
	$('#fullpage').fullpage({
		menu: '#nav-top, #nav-mobile',
		lockAnchors: false,
		animateAnchor: true,
		scrollBar: false,
		scrollOverflow: true,

		navigation: false,
		slidesNavigation: false,

		onLeave: function (prevIndex, nextIndex, direction) {
			updateSectionStyle(prevIndex, nextIndex);
		},
		afterLoad: function (anchorLink, index, slideAnchor, slideIndex) {
			updateSectionStyle(-1, index);
		}
	});

	removeFOUCbarriers();
	
	// If fullpage is active on the page, do the following fullpage related stuff.
	// This has to happen AFTER the FOUC barriers are lifted, otherwise fullpage will not update (aka animate) the page correctly.
	if ($('html').hasClass('fp-enabled')) {

		// Creates scrolling animation when the page is linked to using an anchor. f.e. if some page links to home/#contact, this will go to the main home slide first and then scroll down to #contact
		const sectionInURL = window.location.hash.replace('#', '') || 'home'; // Gets the correct section from the url ('/home/#contact' -> 'contact'). If no anchor is given, the default is 'home'
		$.fn.fullpage.silentMoveTo(1); // moves to the first section instantly without animation
		$.fn.fullpage.moveTo(sectionInURL); // Scrolls down using animation
	}
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

// Adds a stylesheet from a given source address
function addScript(element, src) {
	const script = document.createElement('script');
	script.src = src;
	script.async=false;
	script.onload = loadedResourceCallback;
	script.classList.add("dynamic-resource");
	element.appendChild(script);

}

// Adds, loads and runs a script from a given source address
function addStylesheet(element, src) {
	const script = document.createElement('link');
	script.rel = "stylesheet";
	script.type = "text/css";
	script.href = src;
	script.onload = loadedResourceCallback;
	script.classList.add("dynamic-resource");
	element.appendChild(script);
}

// Finds all instances of the indicator class and applies the template to them
function applyTemplate(indicator, template) {
    const instances = document.getElementsByClassName(indicator);
    [...instances].forEach(element => { template(element); element.classList.remove(indicator); });
}

// Once all resources that were added as a template have loaded, this callback will trigger the final stage of the page creation
let loadedResources = 0;
function loadedResourceCallback() {
	loadedResources++;
	
	const instances = document.getElementsByClassName("dynamic-resource");
	const totalResources = [...instances].length;
	if (loadedResources==totalResources) {
		finishPageCreation();
	}
}

// This is where all the templates are defined
function applyTemplates() {

    applyTemplate("templates-head", el=>{
		addGeneral(el, `
			<meta name="viewport" content="width=device-width">
			<meta charset="UTF-8">

			<!-- ICONS -->
			<link rel="apple-touch-icon" type="image/png" sizes="57x57"   href="/static/media/general/ico/apple-touch-icon-57x57.png">
			<link rel="apple-touch-icon" type="image/png" sizes="60x60"   href="/static/media/general/ico/apple-touch-icon-60x60.png">
			<link rel="apple-touch-icon" type="image/png" sizes="72x72"   href="/static/media/general/ico/apple-touch-icon-72x72.png">
			<link rel="apple-touch-icon" type="image/png" sizes="76x76"   href="/static/media/general/ico/apple-touch-icon-76x76.png">
			<link rel="apple-touch-icon" type="image/png" sizes="114x114" href="/static/media/general/ico/apple-touch-icon-114x114.png">
			<link rel="apple-touch-icon" type="image/png" sizes="120x120" href="/static/media/general/ico/apple-touch-icon-120x120.png">
			<link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/static/media/general/ico/apple-touch-icon-144x144.png">
			<link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/static/media/general/ico/apple-touch-icon-152x152.png">
			<link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/static/media/general/ico/apple-touch-icon-180x180.png">
			<link rel="icon"             type="image/png" sizes="16x16"   href="/static/media/general/ico/favicon-16x16.png">
			<link rel="icon"             type="image/png" sizes="32x32"   href="/static/media/general/ico/favicon-32x32.png">
			<link rel="icon"             type="image/png" sizes="96x96"   href="/static/media/general/ico/favicon-96x96.png">
			<link rel="icon"             type="image/png" sizes="192x192" href="/static/media/general/ico/android-chrome-192x192.png">
			<link rel="manifest" href="/static/media/general/ico/manifest.json">
			<link rel="mask-icon" href="/static/media/general/ico/safari-pinned-tab.svg" color="#0572ba">
			<link rel="shortcut icon" href="/static/media/general/ico/favicon.ico">
			<meta name="msapplication-TileColor" content="#da532c">
			<meta name="msapplication-TileImage" content="/static/media/general/ico/mstile-144x144.png">
			<meta name="msapplication-config" content="/static/media/general/ico/browserconfig.xml">
			<meta name="theme-color" content="#ffffff">
		`);
		// CSS
		addStylesheet(el, "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
		addStylesheet(el, "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.css");
		addStylesheet(el, "/static/stylesheets/polaroids.css");
		addStylesheet(el, "/static/stylesheets/typography.css");
		addStylesheet(el, "/static/stylesheets/customs.css");
		addStylesheet(el, "/static/stylesheets/navigation.css");
		addStylesheet(el, "/static/stylesheets/style-v1.css");
		// FONTS
		addStylesheet(el, "https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,700");
		addStylesheet(el, "https://fonts.googleapis.com/css?family=Lato:400,200,700,300");
		// font awesome icons
		addStylesheet(el, "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");
	});

	applyTemplate("templates-copyright", el=>{
		addGeneral(el, `
			<span>©2020-`+new Date().getFullYear()+` BEST Ghent vzw. All rights reserved.</span>
		`);
	});

	applyTemplate("templates-scripts", el=>{
		addScript(el, "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
		addScript(el, "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/vendors/scrolloverflow.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js");
		addScript(el, "/static/scripts/owl-carousel.js");
		addScript(el, "/static/scripts/navigation.js");
	});

	applyTemplate("templates-nav-main", el=>{

		var currentPage = self.location.href.split('/').at(-2); // A url splits from "base/stuff/.../currentPage/" into ['base', 'stuff', ..., 'currentPage', '']

		let links = "";
		for (const link in navMainLinks) {
			links += `
			<li class="`+((navMainLinks[link] == "/"+currentPage) ? "active" : "")+`">
				<a href="`+navMainLinks[link]+`">
					<span>`+link+`</span>
				</a>
			</li>`;
		}

		let desktop = `
		<nav class="navbar navbar-top">
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav" id="nav-top">`
					+links+`
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
            	<ul class="nav navbar-nav text-center" id="nav-mobile">`
					+links+`
				</ul>
			</div>
		</nav>`;
		addGeneral(el, mobile);
	});
}

window.addEventListener('load', function (event) {
	applyTemplates();
});