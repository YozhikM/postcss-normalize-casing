# postcss-normalize-casing

[![Build Status](https://travis-ci.org/YozhikM/postcss-normalize-casing.svg?branch=master)](https://travis-ci.org/YozhikM/postcss-normalize-casing)

This plugin normalizes your CSS, which written not in a case-sensitive, in a valid CSS.

## Installation

```bash
yarn add --dev postcss postcss-normalize-casing
```

## Usage

```js
const fs = require('fs');
const postcss = require('postcss');

const css = fs.readFileSync('css/input.css', 'utf8');

export default async function(css) {
  const output = await postcss.process(css, {
    from: 'css/input.css',
  });
  const outputCSS = output.css;
}
```

`css/input.css`:

```css
a {
  color: RED;
  transform: TRANSLATEY(10);
  CURSOR: PoInTeR;
}
```

`outputCSS`:

```css
a {
  color: red;
  transform: translateY(10);
  cursor: pointer;
}
```

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ yarn test`).
