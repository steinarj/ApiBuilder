'use strict';

var expect = require('expect.js');

describe('models/index', function () {
    var models = require('../../models');

    it('returns the task model', function () {

        expect(models.Task).to.be.ok();
    });

    it('returns the user model', function () {

        expect(models.User).to.be.ok();
    });

    it('return the customer model', function(){
        
        expect(models.Customer).to.be.ok();
    });
});