var listModel = require('../../../models/list');
var expect = require('chai').expect;
var updateItemMW = require('../../../middleware/item/updateItemMW');

describe('updateItemMW middleware ', function () {

    describe('should redirect to /items/:listid', function () {

        it('no post parameter is given', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            var fakeReq = {
                body: undefined,
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(nehivd).to.be.eql(false);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, {});
        });

        it('name parameter is undefined', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            var fakeReq = {
                body: {
                    name: undefined,
                    quantity: 2,
                    comment: 'no comment'
                },
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(nehivd).to.be.eql(false);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, {});
        });

        it('quantity parameter is undefined', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            var fakeReq = {
                body: {
                    name: 'hello',
                    quantity: undefined,
                    comment: 'no comment'
                },
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(nehivd).to.be.eql(false);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, {});
        });

        it('comment parameter is undefined', function (done) {

            var nehivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    nehivd = true;
                    cb();
                }
            };

            var fakeReq = {
                body: {
                    name: 'hello',
                    quantity: 2,
                    comment: undefined
                },
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(nehivd).to.be.eql(false);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, {});
        });

        it('no result returned', function (done) {

            var hivd = false;

            var fakeListModel = {
                findOne: function (some, cb) {
                    hivd = true;
                    cb();
                }
            };

            var fakeReq = {
                body: {
                    name: 'hello',
                    quantity: 2,
                    comment: 'no comment'
                },
                params: {
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(hivd).to.be.eql(true);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeListModel
            })(fakeReq, fakeRes, {});
        });

        it('result is modified', function (done) {

            var hivd = false;

            var saved = false;

            fakeList = {
                _id: '1234',
                name: 'resultList',
                owner_email: 'test@gmail.com',
                item: [
                    {
                        name: 'firstItem',
                        quantity: 1,
                        comment: 'nocomment',
                        _id: '124'
                    },
                    {
                        name: 'secondItem',
                        quantity: 2,
                        comment: 'yescomment',
                        _id: '123'
                    }
                ],
                findOne: function (some, cb) {
                    hivd = true;
                    return cb(undefined, fakeList);
                },
                save: function (cb) {
                    saved = true;
                    cb();
                }
            };

            var fakeReq = {
                body: {
                    name: 'hello',
                    quantity: 5,
                    comment: 'no comment',
                    _id: '123'
                },
                params: {
                    itemid: '123',
                    listid: '1234'
                }
            };

            var fakeRes = {
                tpl: {
                    error: {
                        push: function (some) {

                        }
                    }
                },
                redirect: function (link) {
                    expect(hivd).to.be.eql(true);
                    expect(saved).to.be.eql(true);
                    expect(link).to.be.eql('/items/' + fakeReq.params.listid);
                    expect(fakeList.item[1].name).to.be.eql(fakeReq.body.name);
                    expect(fakeList.item[1].quantity).to.be.eql(fakeReq.body.quantity);
                    expect(fakeList.item[1].comment).to.be.eql(fakeReq.body.comment);
                    done();
                }
            };

            updateItemMW({
                listModel: fakeList
            })(fakeReq, fakeRes, {});
        });
    })

});