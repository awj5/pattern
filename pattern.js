/*

Pattern v1.1
A vanilla JavaScript URL hash handler. Compatible with modern browsers only (ES6+).
https://github.com/adamwjohnson5/pattern
By Adam Johnson
MIT License 2019

Usage:

let pttrn = new Pattern();
pttrn.slugMode = true; // Optional - Will ignore section/page change if a URL parameter is defined
pttrn.hash();

*/
"use strict";

class Pattern {

    /* slugMode will ignore section/page change if a URL parameter is defined */

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
    // Set section to 'home' if not defined or slugMode is enabled and a URL parameter is defined
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