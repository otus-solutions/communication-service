describe('MessageIssueFactory_Suite_Tests', function () {
    const data = require('../data/json-importer');

    let MessageFactory;
    let Mock = {};

    beforeEach(function () {
        mock();
        MessageFactory = require('../../app/models/MessageFactory')();
    });

    function mock(){
        Mock.message = data.message;
        Mock.hit = data.messageHit;
    }

    test('create', function () {
        const message = MessageFactory.create(Mock.message);
        expect(message.isValid()).toBe(true);
        expect(message.toJSON()).toBeDefined();
    });

    test('fromHit', function () {
        const message = MessageFactory.fromHit(Mock.hit);
        expect(message._id).toBe(Mock.hit._id);
    });

    test('getMapping', function () {
        const mapping = MessageFactory.getMapping();
        expect(Object.keys(mapping.mappings.properties).sort()).toEqual([
            'text', 'sender', 'issueId', 'creationDate'
        ].sort());
    });

});
