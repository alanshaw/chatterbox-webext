# Chatterbox Web Extension

> P2P messaging application bundled as a web extension for Firefox and Chrome

## Install

TODO: add app store URLs

### Install for Development

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
