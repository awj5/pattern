/*

Pattern v2.2
A JavaScript router utilizing the HTML5 history API. Compatible with modern browsers only (ES6+).

https://github.com/adamwjohnson5/pattern

By Adam Johnson
MIT License 2019

Usage:

Pattern.init(); // Change URL with pushState eg. history.pushState(null, null, 'about');

*/

"use strict";

class Pattern {
    static init(rootPath) { // Root path optional
        const state = history.pushState;
        
        history.pushState = function() {
            state.apply(history, arguments);
            urlHandler(rootPath);
        };
        
        // Listen for browser back or forward
        window.addEventListener('popstate', () => {
            urlHandler(rootPath);
        });
        
        urlHandler(rootPath); // Fire on init
    }
}

function urlHandler(rootPath) {
    // Set section
    var urlSection = location.pathname.replace(rootPath, ''); // Remove root path
    urlSection = urlSection.replace('/', '');
    
    // Check for URL params
    if (urlSection.indexOf('?') !== -1) {
        urlSection = urlSection.substr(0, urlSection.indexOf('?')); // Remove all URL params from section
    }
    
    window.pattern = ! urlSection ? 'home' : urlSection; // Set section var to 'home' if empty
    
    // Get URL params
    var urlParams = location.search.split('?').pop();
    urlParams = new URLSearchParams(urlParams);
    
    // Loop all params and create global vars
    for (let param of urlParams.entries()) {
        window[param[0]] = param[1];
    }
    
    // Loop all global vars
    for(var name in window) {
        let i = name.replace('Pattern', '');
        
        // Clear if not included in URL params
        if (name.indexOf('Pattern') != -1 && ! urlParams.has(i)) {
            window[name] = '';
        }
    }
    
    // Call section function if exists
    const func = window[window.pattern];
    
    if (typeof func === 'function') {
        func();
    } else if (typeof patternLoad === 'function') { // Check for generic func
        patternLoad(); // Called only if section func not available
    }
}