# NodeJS C++ AddOn

Demostration of how to create `C++` addon for nodejs

## Build

```bash
node-gyp configure
node-gyp build
```

## Usage

```js
const rustAddon = require('./build/Release/hello_addon.node');
rustAddon.helloWorld();
```
