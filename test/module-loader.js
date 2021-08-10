var vm = require('vm');
var fs = require('fs');
var path = require('path');
var extend = require('extend'); // install from npm

/**
 * Helper for unit testing:
 * - load module with mocked dependencies
 * - allow accessing private state of the module
 *
 * @param {string} filePath Absolute path to module (file to load)
 * @param {Object=} mocks Hash of mocked dependencies
 */
exports.loadModule = function(filePath, mocks) {
  mocks = mocks || {};

  // this is necessary to allow relative path modules within loaded file
  // i.e. requiring ./some inside file /a/b.js needs to be resolved to /a/some
  var resolveModule = function(module) {
    if (module.charAt(0) !== '.') return module;
    return path.resolve(path.dirname(filePath), module);
  };

  var exports = {};
  var context = {
    require: function(name) {
      return mocks[name] || require(resolveModule(name));
    },
    console: console,
    exports: exports,
    module: {
      exports: exports
    }
  };

  var extendMe = {};
  extend(true, extendMe, context, mocks);

  // runs your module in a VM with a new context containing your mocks
  // http://nodejs.org/api/vm.html#vm_vm_runinnewcontext_code_sandbox_filename
  vm.runInNewContext(fs.readFileSync(filePath), extendMe);

  return extendMe;
};
