# Pattern

A JavaScript router utilizing the HTML5 history API. Compatible with modern browsers only (ES6+).

Pattern will assign variables on URL change and look for a function to call (examples below).

**❗❗❗A server-side rewrite rule is usually required.❗❗❗**

<img src="pattern.png" width="160" height="200">

## Usage

```
let patrn = new Pattern();
patrn.init();

history.pushState(null, null, 'about'); // Change URL with pushState
```

## Examples

https://example.com/page?id=1  
This URL will look for a function called `page()`, create a variable called `window.id` with a value of `1` and assign `'page'` to the `window.pattern` variable.

https://example.com/?id=2&page=5  
This URL will look for a function called `home()` (`'home'` is used when no path is defined), create a variable called `window.id` with a value of `2`, a variable called `window.page` with a value of `5` and assign `'home'` to the `window.pattern` variable.

## Advanced

When you initiate Pattern you can include a root path. This is useful if your app is not located in the root of your domain ie. https://example.com/myapp

```
let patrn = new Pattern('/myapp');
```

Your app can include a function called `patternChange()` which will be called whenever there is a URL change.

```
function patternChange() {
    console.log(window.pattern);
}
```

### [MIT License](https://en.wikipedia.org/wiki/MIT_License) 2019
