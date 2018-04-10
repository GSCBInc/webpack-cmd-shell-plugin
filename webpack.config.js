const path = require('path');
const WebpackCmdShellPlugin = require('./lib');

let WebpackCmdShellPluginConfig = new WebpackCmdShellPlugin({
    beforeCompile: [{
        command: 'echo',
        args: ['Webpack', 'is', 'starting', 'compile']
    }],
    onMake: [{
        command: 'echo',
        args: ['Webpack', 'is', 'compiling']
    }],
    afterCompile: [{
        command: 'echo',
        args: ['Webpack', 'has', 'finished', 'compiling']
    }],
    onEmit: [{
        command: 'echo',
        args: ['Webpack', 'is', 'emitting', 'files']
    }],
    afterEmit: [{
        command: 'echo',
        args: ['Webpack', 'has', 'finished', 'emitting', 'files']
    }],
    whenDone: [{
        command: 'echo',
        args: ['Webpack', 'has', 'finished', 'building']
    }],

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
