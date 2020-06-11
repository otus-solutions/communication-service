const mongoose = require('mongoose');
const CommunicationModel = mongoose.model('communication');

describe('MailerService.js Tests', function () {
    var service, assert, application;
    const Mock = {};

    beforeEach(function () {
        mocks();

        application = require("../../config/server");

        Mock.nodemailer = require('nodemailer');
        Mock.Response = application.app.utils.Response;

        service = require("../../app/services/MailerService")(application);
        assert = require('assert');
    });

    it('service should defined', function () {
        expect(service).toBeDefined();
    });

    function mocks() {
        Mock.error =
        {
            "code": 406,
            "body": {
                "data": "Variable was not found."
            }
        };
        Mock.data = {
            "email": "teste@gmail.com",
            "variables": {
                "name": "fulano"
            },
            "_id": "5e17cab5b613222e9d19a76e"
        };
        Mock.dataTwo = {
            "email": "teste@gmail.com",
            "variables": {
                "name": "fulano",
                "id": "3536232"
            },
            "_id": "5e17cab5b613222e9d19a76e"
        };
        Mock.transport = {
            host: 'localhost',
            port: 1025,
            secure: false,
            auth: {
                user: 'project.1',
                pass: 'secret.1'
            },
            sendMail: (options, callback) => callback(undefined, 'info'),
            close: function () { }
        };
        Mock.transportNull = {
            sendMail: (options, callback) => callback(new Error('err'), undefined),
            close: function () { }
        }
    }
});
