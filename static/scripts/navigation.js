$(document).ready(function () {
    // This code is responsible for both the general navigation menu's as the navigation on the home page
    
    // Toggles the mobile menu on and off when clicking the menu symbol (the 3 horizontal bars).
    $('.navbar-toggle').click(()=>{
        $('.mobilemenu').toggleClass('active');
    });

    // Closes mobile menu when you click anywhere.
    // Clicking on a link in the menu will still work as the redirect happens before the menu closes.
    $('.mobilemenu').on('click', ()=>{
        $('.mobilemenu').removeClass('active');
    });
});
