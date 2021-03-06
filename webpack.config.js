const path = require('path');
const WebpackCmdShellPlugin = require('./lib');

let WebpackCmdShellPluginConfig = new WebpackCmdShellPlugin({
    beforeStart: 'echo Webpack is starting up',
    beforeCompile: 'echo Webpack is starting compile',
    onMake: 'echo Webpack is compiling',
    afterCompile: 'echo Webpack has finished compiling',
    onEmit: 'echo Webpack is emitting files',
    afterEmit: 'echo Webpack has finished emitting files',
    whenDone: [
        'echo Attempting to run npm version patch next',
        'npm version patch --no-git-tag-version',
        'echo Webpack has finished building'
    ],
    enforceOrder: true,
    verbose: false
});
module.exports = function () {

    return {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [WebpackCmdShellPluginConfig]
    };
};
