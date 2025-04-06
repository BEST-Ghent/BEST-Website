$(document).ready(function () {
    
    $('.owl-carousel').owlCarousel({
        items: 1,           // Number of items to display at once
        loop: true,
        autoHeight: true,   // Changes the height of the div to fit the current item
        dots: true,         // Adds dots indicating what item you're on
        nav: false          // Adds prev and next buttons
    });
});