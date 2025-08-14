"use strict";

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    //Find hamburger menu button and the navigation element for the mobile menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navigation = document.querySelector('.navigation');

    //If elements exist, show the navigation menu when clicked
    if (hamburgerMenu && navigation) {
        hamburgerMenu.addEventListener("click", () => {
            navigation.classList.toggle('visible');
        });
    }
});

