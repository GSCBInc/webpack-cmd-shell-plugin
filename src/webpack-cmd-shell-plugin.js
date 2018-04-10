const _ = require('lodash');

const BEFORE_COMPILE = 'compilation';

const DEFAULT_SETTINGS = {
    beforeCompile: [{
        command: 'echo',
        args: ['Webpack', 'is', 'Compiling']
    }],
    verbose: false
};
let self = {};

self.createCommandObjectFromString = function (commandString) {
    return commandString;
};

self.parseCommand = function (command) {

    if (_.isString(command)) {

    }
    else if (_.isArray(command)) {

    }
    else if (_.isObject(command)) {

    }

    return command;
};

class WebpackCmdShellPlugin {

    constructor (settings) {
        this.settings = _.assign(DEFAULT_SETTINGS, settings);
    }

    beforeCompile (compilation) {
        if (this.settings.verbose) {

        }
        if (this.settings.beforeCompile) {
            this.settings.beforeCompile = self.parseCommand(this.settings.beforeCompile);
        }
    }

    apply (compiler) {

        compiler.plugin(BEFORE_COMPILE, this.beforeCompile);
    }
}

export default WebpackCmdShellPlugin;
