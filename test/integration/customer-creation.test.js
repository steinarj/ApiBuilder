'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('Customer creation page', function () {
    beforeEach(function () {
        this.models = require('../../models');

        return Bluebird.all([
            this.models.Customer.destroy({ truncate: true }),
        ]);
    });

    it('loads correctly', function (done) {
        request(app).get('/customers').expect(200, done);
    });

    it('lists a customer if there is one', function (done) {
        this.models.Customer.create({clientId: 99999999999900, id: 300, name: 'IBM Inc' }).then(function () {
            request(app).get('/customers').expect(/IBM Inc/, done);
        })
    });


});