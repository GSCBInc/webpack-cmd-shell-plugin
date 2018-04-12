# Webpack Command Shell Plugin
Run flexible and configurable shell commands through each step of the webpack build process.

## Installation

`npm install --save-dev webpack-cmd-shell-plugin`

## Setup
In `webpack.config.js`:

```js
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    . . .
    . . .
    plugins: [
        new WebpackCmdShellPlugin({
            enforceOrder: true,
            beforeStart: 'karma start',
            whenDone: [
                'npm version patch -m "Incrementing app version to %s"',
                'git push origin HEAD',
                'git push --tags'
            ]
        })
    ]
};
```

## Example

Insert into your webpack.config.js:

```js
const path = require('path');
const WebpackCmdShellPlugin = require('webpack-cmd-shell-plugin');
const WebpackCmdShellPluginConfig = new WebpackCmdShellPlugin({
    enforceOrder: true,
    beforeStart: 'echo Webpack is starting up',
    beforeCompile: 'echo Webpack is starting a compile stage',
    afterCompile: 'echo Webpack has finished compiling stage',
    onEmit: 'echo Webpack is emitting files',
    afterEmit: 'echo Webpack has finished emitting files',
    whenDone: [
        'echo Attempting to run npm version patch next',
        'npm version patch --no-git-tag-version',
        'echo Webpack has finished building'
    ]
});

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }]
    }
    plugins: [WebpackCmdShellPluginConfig]
};
```

### API
* `beforeStart`: script or array of scripts that are executed before webpack starts building.
* `beforeCompile`: script or array of scripts that are executed before webpack starts compiling a bundle of assets
* `afterCompile`: script or array of scripts that are executed after webpack finishes compiling a bundle of assets
* `onEmit`: script or array of scripts that are executed when webpack starts emitting files
* `afterEmit`: script or array of scripts that are executed when webpack finishes emitting files
* `whenDone`: script or array of scripts that are executed when webpack finishes building
* `enforceOrder`: ensures that an array of scripts for a certain build process are executed in order **Default: false**

### Developing
If opening a pull request, create an issue describing a fix or feature. Have your pull request point to the issue by writing your commits with the issue number in the message

Example: `git commit -m "Fixing typo within documentation #18"`

### Contributors
Christopher Thaw
