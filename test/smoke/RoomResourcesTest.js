var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var room_resources = require('../../lib/features/RoomResources');
var room = require('../../resources/room.json');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

before(function (done) {
    tokenGenerator
        .generateToken(function (err, res) {
            done();
        })
});

context('Smoke test for resources of rooms', function () {
    this.timeout(10000);

    var body = {
        name: "testResource",
        customName: "deleteTestResource",
        fontIcon: "fa fa-desktop",
        from: "",
        description: "delete testResource"
    };

    var resourceErr, resourceRes;

    beforeEach(function (done) {
        resources.postResources(body, function (err, res) {
            resourceErr = err;
            resourceRes = res.body;
            done();
        });
    });
    afterEach(function (done) {
        resources.deleteResource(resourceRes._id, function (err, res) {
            done();
        });
    });

    it('GET /rooms/{:roomId}/resources/{:roomResourceId}', function (done) {
        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room.id, jsonJoin, function (err, res) {
            room_resources.getResourceOfRoom(room.id, res.body.resources[0]._id, function (err, res) {
                expect(200).to.equal(res.status);
                done();
            })
        })
    })

    it('PUT /rooms/{:roomId}/resources/{:roomResourceId}', function (done) {
        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room.id, jsonJoin, function (err, res) {
            room_resources.putResourceOfRoom(room.id, res.body.resources[0]._id,{"quantity": 10}, function (err, res) {
                expect(200).to.equal(res.status);
                done();
            })
        })
    })

    it('DELETE /rooms/{:roomId}/resources/{:roomResourceId}', function (done) {
        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room.id, jsonJoin, function (err, res) {
            room_resources.delResourceOfRoom(room.id, res.body.resources[0]._id, function (err, res) {
                expect(200).to.equal(res.status);
                done();
            })
        })
    })
})


