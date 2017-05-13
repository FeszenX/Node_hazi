var expect = require('chai').expect;
var getListMW = require('../../../middleware/list/getListMW');

describe('getListMW middleware ', function () {

    describe('should call next when', function () {

        it('no get parameter is given', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            getListMW({
                listModel: fakeListModel
            })({}, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            })
        });

        it('no listid parameter is given', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            var fakeReq = {
                params: {
                    listid: undefined
                }
            };

            getListMW({
                listModel: fakeListModel
            })(fakeReq, {}, function (err) {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            })
        });

        it('findOne result is empty', function (done) {

            var hivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    hivd = true;
                    return cb(undefined, null);
                }
            };

            var fakeReq = {
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    listItems: [],
                    listId: undefined
                }
            };

            getListMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, function (err) {
                expect(hivd).to.be.eql(true);
                expect(err).to.be.eql(undefined);
                expect(fakeRes.tpl.listId).to.be.eql(undefined);
                expect(fakeRes.tpl.listItems).to.be.eql([]);
                expect(fakeReq.params.listid).to.be.eql('1234');
                done();
            })
        });

        it('findOne result is not empty and got back the proper list',
            function (done) {

            var hivd = false;

            fakeList = {
                name: 'resultList',
                owner_email: 'test@gmail.com',
                item: [
                    {
                        name: 'firstItem',
                        quantity: 1,
                        comment: 'nocomment'
                    },
                    {
                        name: 'secondItem',
                        quantity: 2,
                        comment: 'yescomment'
                    }
                ]
            };

            var fakeListModel = {
                findOne: function (some, cb) {
                    hivd = true;
                    return cb(undefined, fakeList);
                }
            };

            var fakeReq = {
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    listItems: [],
                    listId: undefined
                }
            };

            getListMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, function (err) {
                expect(hivd).to.be.eql(true);
                expect(err).to.be.eql(undefined);
                expect(fakeRes.tpl.listId).to.be.eql('1234');
                expect(fakeRes.tpl.listItems).to.be.eql(fakeList.item);
                expect(fakeReq.params.listid).to.be.eql('1234');
                done();
            })
        });

    })

});