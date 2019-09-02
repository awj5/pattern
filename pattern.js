/*

Pattern
A vanilla JavaScript URL hash handler.
https://github.com/adamwjohnson5/pattern
By Adam Johnson
MIT License 2019

Usage:

Pattern.hash();

*/
"use strict";

class Pattern {
    static hash() {
        window.section; // Global var
        // Listen for URL hash change
        window.addEventListener('hashchange', hashHandler);
        hashHandler();
    }
}

/* URL hash */

function hashHandler() {
    let i = location.hash; // Get URL hash
    // Get section
    var urlSection = i.replace('#', '');
    urlSection = urlSection.replace(/\//g, '');
    if (i.indexOf('?') !== -1) {
        urlSection = urlSection.substr(0, urlSection.indexOf('?'));
    }
    // Set section to 'home' if not defined
    if (!urlSection) {
        urlSection = 'home';
    }
    window.section = urlSection; // Set section global var
    // Get URL params
    var urlParams = i.split('?').pop();
    urlParams = new URLSearchParams(urlParams);
    // Loop all params and create global vars
    for (let x of urlParams.entries()) {
        window[x[0]] = x[1];
    }
    // Call section function if exists
    const func = window[urlSection + 'Load'];
    if (typeof func === 'function') {
        func();
    }
}