var URL = require('url')
    , _ = require('lodash')
;
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        this.complete(_.compact(_.map(step.input('urls').toArray(), function(url) {
            var parts = URL.parse(url)
                , path = parts.path
            ;
            if(path && path.toLowerCase().indexOf('/home') === 0) {
                return { 'folder': unescape(path.replace(/\/home/i, '')) || '/' };
            }
            return null;
        })));
    }
};
