# Chatterbox Web Extension

[![dependencies Status](https://david-dm.org/alanshaw/chatterbox-core/status.svg)](https://david-dm.org/alanshaw/chatterbox-webext)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> P2P messaging application bundled as a web extension for Firefox and Chrome

## Install

| <img src="https://unpkg.com/@browser-logos/firefox@2.0.0/firefox_32x32.png" width="16"> [Firefox](https://www.mozilla.org/firefox/new/) | <img src="https://unpkg.com/@browser-logos/chrome@1.0.4/chrome_32x32.png" width="16"> [Chrome](https://www.google.com/chrome/)
|---|---|
| [![Install From AMO](https://ipfs.io/ipfs/QmWNa64XjA78QvK3zG2593bSMizkDXXcubDHjnRDYUivqt)](https://addons.mozilla.org/firefox/addon/chatterbox/) | TBC |

### Install for Development

Ensure Node.js 12+ and npm 6+ are installed.

1. Clone this repo
2. Install the project dependencies with `npm install`
3. Build the project `npm run build` (see [build](#build) below)
4. Load the web extension in your favourite browser:
    * **Firefox**
        1. Navigate to `about:debugging#/runtime/this-firefox`
        2. Click on the "Load temporary add-on" button
        3. Select `manifest.json` file in the `dist` directory
    * **Chrome**
        1. Navigate to `chrome://extensions`
        2. Click on the "Load unpacked" button
        3. Navigate to the `dist` directory

#### Build

Build with `CHATTERBOX_RELAY_ADDRS` environment variable to specify one or more comma separated multiaddrs of chatterbox relay servers to connect to.

e.g.

```sh
CHATTERBOX_RELAY_ADDRS=/ip4/138.68.55.103/tcp/4138/ws/ipfs/QmTtZnqydWPKxRDuDLbMjo4NHJPwrascKgxQwpBSx5Zd7k npm run build
```

Current production relay addrs:

* `/ip4/138.68.55.103/tcp/4138/ws/ipfs/QmTtZnqydWPKxRDuDLbMjo4NHJPwrascKgxQwpBSx5Zd7k`

#### Package

To package for web extension stores, run the following commands:

1. Build the extension (as above) including any relay addrs
2. Run `npm run package`
3. Output can be found in the `web-ext-artifacts` directory

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/chatterbox-webext/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
