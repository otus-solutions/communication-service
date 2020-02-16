const mongoose = require('mongoose');
const CommunicationModel = mongoose.model('communication');

describe('CommunicationService.js Tests', function () {
    let CommunicationService;
    let ResponseService = require("../../app/utils/Response");

    beforeEach(function () {
        let app = {
            utils: {
                Response: ResponseService
            }
        };
        CommunicationService = require("../../app/services/CommunicationService")({app});
    });

    test('create', async function () {
        jest.setTimeout(30000);
        let communication = {
            "name": "name",
            "template": "template"
        };
        try {
            jest.spyOn(CommunicationModel.prototype, "save").mockImplementation(() => {
                return Promise.resolve();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await CommunicationService.create(communication);
            expect(result).toEqual({
                "body": {
                    "data": true
                },
                "code": 200
            });
            expect(CommunicationModel.prototype.save).toBeCalled()
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('get', async function () {
        try {
            jest.spyOn(CommunicationModel, "findOne").mockImplementation(() => {
                return Promise.resolve({name:"fulano", template:"<html></html>"});
            });
            let result = await CommunicationService.get("5d7baf82ba5ad56a6bae98c2");

            expect(result).toEqual(
                { code: 200,
                    body:
                        { data:
                                {   name: 'fulano',
                                    template: '<html></html>' } } }
            );
            expect(CommunicationModel.findOne).toBeCalledWith({_id:"5d7baf82ba5ad56a6bae98c2"})
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('getAll', async function () {
        let communication = {
            "id":"5d7baf82ba5ad56a6bae98c2",
            "name": "name",
            "template": "template"
        };
        try {
            jest.spyOn(CommunicationModel, "find").mockImplementation(() => {
                return Promise.resolve(communication);
            });
            jest.spyOn(ResponseService, 'success');

            let result = await CommunicationService.getAll();

            expect(result).toEqual({ code: 200,
                body:
                    { data:
                            { id: '5d7baf82ba5ad56a6bae98c2',
                                name: 'name',
                                template: 'template' } } });
            expect(CommunicationModel.find).toHaveBeenCalledTimes(1);
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update', async function () {
        let communication = {
            "id":"5d7baf82ba5ad56a6bae98c2",
            "name": "name",
            "template": "template"
        };
        try {
            jest.spyOn(CommunicationModel, "updateOne").mockImplementation(() => {
                return Promise.resolve(communication);
            });
            jest.spyOn(ResponseService, 'success');

            let result = await CommunicationService.update(communication);
            expect(result).toEqual({ code: 200,
                body:
                    { data: true } });
            expect(CommunicationModel.updateOne).toHaveBeenCalledTimes(1);
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('delete should run query', async function () {
        try {
            jest.spyOn(CommunicationModel, 'deleteOne').mockImplementation(() => {
                return Promise.resolve()});

            await CommunicationService.delete("5d7baf82ba5ad56a6bae98c2");
            expect(CommunicationModel.deleteOne).toBeCalledWith({_id:"5d7baf82ba5ad56a6bae98c2"})
            expect(CommunicationModel.deleteOne).toHaveBeenCalledTimes(1);
        } catch (err) {
            expect(err).toBe(false)
        }
    });

});
