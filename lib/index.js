'use strict';

const _ = require('lodash');

const defaultSettings = {
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
};

const APPLY = 'apply';
const BEFORE_COMPILE = 'compilation';
const ON_MAKE = 'make';
const AFTER_COMPILE = 'after-compile';
const ON_EMIT = 'emit';
const AFTER_EMIT = 'after-emit';
const WHEN_DONE = 'done';

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

            compiler.plugin(BEFORE_COMPILE, self[BEFORE_COMPILE]);
            compiler.plugin(ON_MAKE, self[ON_MAKE]);
            compiler.plugin(AFTER_COMPILE, self[AFTER_COMPILE]);
            compiler.plugin(ON_EMIT, self[ON_EMIT]);
            compiler.plugin(AFTER_EMIT, self[AFTER_EMIT]);
            compiler.plugin(WHEN_DONE, self[WHEN_DONE]);
        }
    }, {
        key: BEFORE_COMPILE,
        value: function beforeCompile(compilation) {
            if (self.settings.beforeCompile) {
                console.log(self.settings.beforeCompile);
            }
        }
    }, {
        key: ON_MAKE,
        value: function onMake(compilation) {
            console.log('On make invoked');
            if (self.settings.onMake) {
                console.log(self.settings.onMake);
            }
        }
    }, {
        key: AFTER_COMPILE,
        value: function afterCompile(compilation) {
            console.log('After compile invoked');
            if (self.settings.afterCompile) {
                console.log(self.settings.afterCompile);
            }
        }
    }, {
        key: ON_EMIT,
        value: function onEmit(compilation, callback) {
            if (self.settings.onEmit) {
                console.log(self.settings.onEmit);
            }
            callback();
        }
    }, {
        key: AFTER_EMIT,
        value: function afterEmit(compilation) {
            if (self.settings.afterEmit) {
                console.log(self.settings.afterEmit);
            }
        }
    }, {
        key: WHEN_DONE,
        value: function whenDone(compilation) {
            if (self.settings.whenDone) {
                console.log(self.settings.whenDone);
            }
        }
    }]);
    return WebpackCmdShellPlugin;
}();

module.exports = WebpackCmdShellPlugin;
