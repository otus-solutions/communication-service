describe('IssueFactory_Suite_Tests', function () {
    const data = require('../data/json-importer');

    let IssueFactory;
    let Mock = {};

    beforeEach(function () {
        mock();
        IssueFactory = require('../../app/models/IssueFactory')();
    });

    function mock(){
        Mock.issue = data.issue;
        Mock.hit = data.issueHit;
    }

    test('create', function () {
        const issue = IssueFactory.create(Mock.issue);
        expect(issue.status).toBe('OPEN');
        expect(issue.isValid()).toBe(true);
        expect(issue.toJSON()).toBeDefined();
    });

    test('fromHit', function () {
        const issue = IssueFactory.fromHit(Mock.hit);
        expect(issue._id).toBe(Mock.hit._id);
    });

    test('getMapping', function () {
        const mapping = IssueFactory.getMapping();
        expect(Object.keys(mapping.mappings.properties).sort()).toEqual([
            'objectType', 'sender', 'group', 'title', 'text', 'creationDate', 'status'
        ].sort());
    });

});
