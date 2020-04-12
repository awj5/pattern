/*

Pattern v1.1
A vanilla JavaScript URL hash handler.
https://github.com/adamwjohnson5/pattern
By Adam Johnson
MIT License 2019

Usage:

let i = new Pattern();
i.slugMode = true; // Optional - Will ignore section change if url parameter is defined
i.hash();

*/
"use strict";

class Pattern {

    /* Slug mode will ignore section change if url parameter is defined */

    slugMode(status) {
        this.slugMode = status;
    }
    
    /* Initiate hash handler */
    
    hash() {
        window.section; // Global var
        // Listen for URL hash change
        window.addEventListener('hashchange', hashHandler.bind(this, this.slugMode));
        hashHandler(this.slugMode);
    }
}

/* URL hash */

function hashHandler(slugMode) {
    let i = location.hash; // Get URL hash
    // Get section
    var urlSection = i.replace('#', '');
    urlSection = urlSection.replace(/\//g, '');
    let j = i.indexOf('?');
    if (j !== -1) {
        urlSection = urlSection.substr(0, urlSection.indexOf('?'));
    }
    // Set section to 'home' if not defined or slug mode is on and url parameter is defined
    if (! urlSection || slugMode && j !== -1) {
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