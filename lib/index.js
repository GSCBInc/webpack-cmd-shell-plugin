'use strict';

const _ = require('lodash');
const childProcess = require('child_process');

const defaultSettings = {
    // Invoked during the compile step
    beforeStart: null,
    // Invoked during the compilation step
    beforeCompile: null,
    // Invoked during the make step
    onMake: null,
    // Invoked during the after-compile step
    afterCompile: null,
    // Invoked during the emit step
    onEmit: null,
    // Invoked during the after-emit step
    afterEmit: null,
    // Invoked during the done step
    whenDone: null,
    // If false ensures all scripts are invoked in their proper order
    enforceOrder: true
};

const APPLY = 'apply';
const BEFORE_START = 'compile';
const BEFORE_COMPILE = 'compilation';
const ON_MAKE = 'make';
const AFTER_COMPILE = 'after-compile';
const ON_EMIT = 'emit';
const AFTER_EMIT = 'after-emit';
const WHEN_DONE = 'done';

let noop = function () {};

let executeScript = function (script, callback, callbackArguments) {
    childProcess.exec(script, {}, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
            console.log('There has been an error ' + stderr);
        }
        else if (stdout) {
            console.log(stdout);
        }

        if (_.isFunction(callback)) {
            callback(callbackArguments);
        }
    });
};

let executeScriptsOrderEnforced = function (scripts) {
    if (scripts.length) {
        executeScript(scripts[0], executeScriptsOrderEnforced, scripts.slice(1));
    }
};

let executeScripts = function (scripts) {
    _.forEach(scripts, function (script) {
        executeScript(script)
    });
};

let execute = function (config, enforceOrder) {
    if (_.isArray(config)) {
        if (enforceOrder) {
            executeScriptsOrderEnforced(config);
        }
        else {
            executeScripts(config);
        }
    }
    else if (_.isString(config)) {
        executeScript(config);
    }
};

let classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

let createClass = function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.writable = "value" in descriptor;
            descriptor.configurable = true;

            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

let WebpackCmdShellPlugin = function () {
    let self;
    function WebpackCmdShellPlugin(settings) {
        classCallCheck(this, WebpackCmdShellPlugin);

        self = this;
        self.settings = _.assign({}, defaultSettings, settings);
    }

    createClass(WebpackCmdShellPlugin, [{
        key: APPLY,
        value: function apply(compiler) {

            compiler.plugin(BEFORE_START, self[BEFORE_START]);
            compiler.plugin(BEFORE_COMPILE, self[BEFORE_COMPILE]);
            compiler.plugin(ON_MAKE, self[ON_MAKE]);
            compiler.plugin(AFTER_COMPILE, self[AFTER_COMPILE]);
            compiler.plugin(ON_EMIT, self[ON_EMIT]);
            compiler.plugin(AFTER_EMIT, self[AFTER_EMIT]);
            compiler.plugin(WHEN_DONE, self[WHEN_DONE]);
        }
    }, {
        key: BEFORE_START,
        value: function beforeStart() {
            if (self.settings.beforeStart) {
                execute(self.settings.beforeStart, noop);
            }
        }
    }, {
        key: BEFORE_COMPILE,
        value: function beforeCompile() {
            if (self.settings.beforeCompile) {
                execute(self.settings.beforeCompile, noop);
            }
        }
    }, {
        key: ON_MAKE,
        value: function onMake(compilation, callback) {
            if (self.settings.onMake) {
                execute(self.settings.onMake, self.settings.async ? noop : callback);
            }

            callback();
        }
    }, {
        key: AFTER_COMPILE,
        value: function afterCompile(compilation, callback) {
            if (self.settings.afterCompile) {
                execute(self.settings.afterCompile, self.settings.async ? noop : callback);
            }

            callback();
        }
    }, {
        key: ON_EMIT,
        value: function onEmit(compilation, callback) {
            if (self.settings.onEmit) {
                execute(self.settings.onEmit, self.settings.async ? noop : callback);
            }

            callback();
        }
    }, {
        key: AFTER_EMIT,
        value: function afterEmit(compilation, callback) {
            if (self.settings.afterEmit) {
                execute(self.settings.afterEmit, self.settings.async ? noop : callback);
            }

            callback();
        }
    }, {
        key: WHEN_DONE,
        value: function whenDone() {
            if (self.settings.whenDone) {
                execute(self.settings.whenDone, self.settings.enforceOrder);
            }
        }
    }]);
    return WebpackCmdShellPlugin;
}();

module.exports = WebpackCmdShellPlugin;
