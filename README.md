# Pattern

A JavaScript router utilizing the HTML5 history API. Compatible with modern browsers only (ES6+).

Pattern will assign variables on URL change and look for a function to call (examples below).

**❗❗❗A server-side rewrite rule is usually required.❗❗❗**

<img src="pattern.png" width="160" height="200">

## Usage

```
let patrn = new Pattern();
patrn.init(callBack); // Callback is required

history.pushState(null, null, 'about'); // Change URL with pushState
```

## Examples

https://example.com/about?id=1
This URL will create a variable called `id` with a value of `1` and assign `'about'` to the `page` variable.

https://example.com/?id=2&name=example
This URL create a variable called `id` with a value of `2`, a variable called `name` with a value of `'example'` and assign `'home'` to the `page` variable.

## Advanced

When you initiate Pattern you can include a root path. This is useful if your app is not located in the root of your domain ie. https://example.com/myapp

```
let patrn = new Pattern('/myapp');
```

### [MIT License](https://en.wikipedia.org/wiki/MIT_License) 2019
