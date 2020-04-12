# Pattern

A vanilla JavaScript URL hash handler.

Pattern will assign global variables on hash change and look for a function to call (examples below).

<img src="pattern.png" width="160" height="200">

## Initialize

```
let pttrn = new Pattern();
pttrn.slugMode = true; // Optional - Will ignore section change if url parameter is defined
pttrn.hash();
```

## Examples

http://example.com#/page/?id=1  
This URL will look for a function called ```pageLoad()```, create a global variable called ```window.id``` with a value of ```1``` and assign ```'page'``` to the ```window.section``` global variable.

http://example.com#/?id=2&page=5  
This URL will look for a function called ```homeLoad()``` (```'home'``` is used when no section is defined), create a global variable called ```window.id``` with a value of ```2```, a global variable called ```window.page``` with a value of ```5``` and assign ```'home'``` to the ```window.section``` global variable.

http://example.com#/slug-name?id=3  
If you have slugMode enabled this URL will look for a function called ```homeLoad()``` (```'home'``` is used instead of ```'slug-mode'``` because slugMode is enabled) and create a global variable called ```window.id``` with a value of ```3```.

### [MIT License](https://en.wikipedia.org/wiki/MIT_License) 2019
