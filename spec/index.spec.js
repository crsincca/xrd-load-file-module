/* global require,describe,it,expect */
'use strict';

describe('LoadFile', function () {

    var dispatcher = require('@crsincca/xrd-dispatch-module');

    it('should send plugin-hand-shake message', function () {
        dispatcher.on('plugin-hand-shake', function (payload) {
            expect(payload).toEqual('xrd-load-file');
        });

        var gui = require('../index.jsx');
    });

});
