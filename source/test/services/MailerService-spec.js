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

    // it('should call sendMail method to send', async () => {
    //     jest.spyOn(CommunicationModel, "findOne").mockImplementation(() => {
    //         return Promise.resolve({ "name": "fulano", "template": "<html>{{name}}</html>" });
    //     });
    //     try {
    //         jest.spyOn(Mock.nodemailer, 'createTransport').mockImplementation(() => Mock.transport);
    //         jest.spyOn(Mock.Response, 'success').mockImplementation(() => Promise.resolve("Ok"));
    //
    //         const result = await service.sendMail(Mock.data);
    //         expect(service.sendMail).toBeDefined();
    //         expect(CommunicationModel.findOne).toBeCalledWith({ _id: "5e17cab5b613222e9d19a76e" });
    //         expect(Mock.Response.success).toHaveBeenCalledTimes(1);
    //         expect(result).toEqual('Ok')
    //     } catch (err) {
    //         expect(err).toBe(false)
    //     }
    // });
    //
    // it('should call sendMail method to send return Error', async () => {
    //     try {
    //         jest.spyOn(CommunicationModel, "findOne").mockImplementation(() => {
    //             return Promise.resolve({ name: "fulano", template: "<html>{{name}}</html>" });
    //         });
    //         jest.spyOn(Mock.Response, 'notFound');
    //
    //         await service.sendMail(Mock.dataTwo);
    //         expect(Mock.Response.notFound).toHaveBeenCalledTimes(1);
    //     } catch (err) {
    //         expect(JSON.stringify(err)).toBe(JSON.stringify(Mock.error))
    //     }
    // });
    //
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
