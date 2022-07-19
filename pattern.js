/*

Pattern v3
A JavaScript router utilising the HTML5 history API. Compatible with modern browsers only (ES6+).

https://github.com/awj5/pattern

By Adam Johnson
MIT License 2019

Usage:

let patrn = new Pattern();
patrn.init(callBack); // Callback is required

history.pushState(null, null, 'about'); // Change URL with pushState

*/
'use strict';

export class Pattern {
    constructor(path) {
        this.path = path; // Root path optional
        this.page;
        this.storedParams = [];
    }

    init(callback) {
        this.callback = callback; // Required
        const state = history.pushState;
        const self = this;

        history.pushState = function() {
            state.apply(history, arguments);
            self.urlHandler();
        };

        // Listen for browser back or forward
        window.addEventListener('popstate', () => {
            self.urlHandler();
        });

        self.urlHandler();
    }

    urlHandler() {
        // Set section
        var urlSection = location.pathname.replace(this.path, ''); // Remove root path if defined
        urlSection = urlSection.replace('/', '');

        // Check for URL params
        if (urlSection.indexOf('?') !== -1) {
            urlSection = urlSection.substr(0, urlSection.indexOf('?')); // Remove all URL params from section name
        }

        this.page = ! urlSection ? 'home' : urlSection; // Set section var to 'home' if empty

        // Get URL params
        var urlParams = location.search.split('?').pop();
        urlParams = new URLSearchParams(urlParams);

        // Loop stored params
        for (let x = 0; x < this.storedParams.length; x++) {
            var paramName = this.storedParams[x];

            // Clear var if param no longer included in URL
            if (! urlParams.has(paramName)) {
                this[paramName] = '';
            }
        }

        this.storedParams = []; // Reset

        // Loop all params and create vars
        for (let param of urlParams.entries()) {
            let paramName = param[0];
            this[paramName] = param[1];
            this.storedParams.push(paramName);
        }

        this.callback();
    }
}