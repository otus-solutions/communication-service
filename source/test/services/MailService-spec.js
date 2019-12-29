describe('MailService.js Tests', function () {
    var app, assert;

    beforeEach(function () {
        app = require("../../app/services/MailService");
        assert = require('assert');
    });

    it('should call sendMail', function () {
        console.log(app)
        let test = app();
        console.log(test.sendMail())
    });
});