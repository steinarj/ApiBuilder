'use strict';

var expect = require('expect.js');

describe('models/Customer', function () {
    beforeEach(function () {
        this.Customer = require('../../models').Customer;

    });

    describe('create', function () {
        it('creates a Customer', function () {
            return this.Customer.create({clientId:99999999999900, id:200, name: 'Apple' }).bind(this).then(function (customer) {
                expect(customer.clientId).to.equal(99999999999900);
                expect(customer.id).to.equal(200);
                expect(customer.name).to.equal('Apple');
            });
        });
    });
});