$(document).ready(function () {
    $('#fullpage').fullpage({
        menu: '#nav-top, #nav-mobile',
        lockAnchors: false,
        anchors: ['home', 'about', 'courses', 'ebec', 'partners', 'contact'],
        navigation: false,
        slidesNavigation: false,

        onLeave: function (index, nextIndex, direction) {
            // main menu bar position
            if (index == 1) {
                $('.navbar-sticky').addClass('move');
                $('#nav-top').removeClass('home');
            }
            if (nextIndex == 1) {
                $('.navbar-sticky').removeClass('move');
                $('#nav-top').addClass('home');
            }

            // main menu css styling
            if (index == 2) {
                $('#nav-top').removeClass('about');
                $('.icon-bar').css('background-color', '');
            }
            if (nextIndex == 2) {
                $('#nav-top').addClass('about');
                $('.icon-bar').css('background-color', '#0071b9');
            }
        },
        afterLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            if (index == 1) {
                $('#nav-top').addClass('home');
            }
        }
    });

    // close nav on click
    $('.navbar-sticky, .navbar-top').click(function(){
        $('.mobilemenu').toggleClass('active');
    });

    $('.mobilemenu, .mobilemenu a').on('click', function(){
        $('.mobilemenu').removeClass('active');
    });

    // add active class to active menu link on detail page
    var slug = self.location.href.split('/');
    slug = slug[slug.length - 2];
    $('.navbar-top li, .mobilemenu li').each(function(index, item){
        if($(item).find('a').attr('href') == '/' + slug){
            $(item).addClass('active');
        }
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoHeight: true,
        dots: true,
        nav: false
    });
});
