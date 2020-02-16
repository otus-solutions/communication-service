describe('CommunicationController.js Tests', function () {
    let CommunicationController;
    let Mock = {};

    let ResponseService = require("../../app/utils/Response");

    let MailerService = require("../../app/services/MailerService")({
        app : {
            utils: {
                Response: ResponseService
            }
        }
    });

    let CommunicationService = require("../../app/services/CommunicationService")({
        app : {
            utils: {
                Response: ResponseService
            }
        }
    });

    beforeEach(function () {
        mock();
        let app = {
            services: {
                CommunicationService: CommunicationService,
                MailerService: MailerService
            },
            utils: {
                Response: ResponseService
            }
        };
        CommunicationController = require("../../app/controllers/CommunicationController")({app});
    });

    test('sendMail', function () {
        jest.spyOn(MailerService, "sendMail");

        let result = CommunicationController.sendMail(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(MailerService.sendMail).toBeCalledWith(Mock.data)
    });

    test('sendMail return error', function () {
        jest.spyOn(ResponseService, "notAcceptable");

        let result = CommunicationController.sendMail({"id":"5e17cab5b613222e9d19a76e"});
        expect(result).toEqual(Promise.resolve({}));
        expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);
    });

    test('create', function () {

        jest.spyOn(CommunicationService, "create");

        let result = CommunicationController.create(Mock.communication);
        expect(result).toEqual(Promise.resolve({}));
        expect(CommunicationService.create).toBeCalledWith(Mock.communication);
    });

    test('create return error', function () {
        jest.spyOn(ResponseService, "notAcceptable");

        let result = CommunicationController.create({"name":"name"});
        expect(result).toEqual(Promise.resolve({}));
        expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);

    });

    test('get', function () {
        jest.spyOn(CommunicationService, "get");

        let result = CommunicationController.get("5e17cab5b613222e9d19a76e");
        expect(result).toEqual(Promise.resolve({}));
        expect(CommunicationService.get).toBeCalledWith("5e17cab5b613222e9d19a76e");
    });

    test('get return error', function () {
        jest.spyOn(ResponseService, "notAcceptable");

        let result = CommunicationController.get({"name":"name"});
        expect(result).toEqual(Promise.resolve({}));
        expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);

    });

    test('getAll', function () {
        jest.spyOn(CommunicationService, "getAll");

        let result = CommunicationController.getAll();
        expect(result).toEqual(Promise.resolve({}));
        expect(CommunicationService.getAll).toHaveBeenCalledTimes(1);
    });

    test('update', function () {
        jest.spyOn(CommunicationService, "update");
        Mock.communication._id = "5e17cab5b613222e9d19a76e";

        let result = CommunicationController.update(Mock.communication);
        expect(result).toEqual(Promise.resolve({}));
        expect(CommunicationService.update).toBeCalledWith({"_id":"5e17cab5b613222e9d19a76e","name": "name","template": "template"});
    });

     test('update return error', function () {
        jest.spyOn(ResponseService, "notAcceptable");

        let result = CommunicationController.update({"name":"name"});
        expect(result).toEqual(Promise.resolve({}));
        expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);

    });

    test('delete', function () {
        jest.spyOn(CommunicationService, "delete");

        let result = CommunicationController.delete("5e17cab5b613222e9d19a76e");
        expect(result).toEqual(Promise.resolve({}));
        expect(CommunicationService.delete).toBeCalledWith("5e17cab5b613222e9d19a76e");
    });

    test('delete return error', function () {
        jest.spyOn(ResponseService, "notAcceptable");

        let result = CommunicationController.delete({"name":"name"});
        expect(result).toEqual(Promise.resolve({}));
        expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);
    });

    function mock(){
        Mock.communication = {
            "name": "name",
            "template": "template"
        };
        Mock.data = {
            "email":"teste@gmail.com",
            "variables":{
                "name":"fulano"
            },
            "id":"5e17cab5b613222e9d19a76e"
        };
    }
});
