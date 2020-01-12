describe('ValidationService.js Tests', function () {
    var service, application;
    const Mock = {};

    beforeEach(function () {
        mocks();

        application = require("../../config/server");

        service = require("../../app/services/ValidationService")(application);

    });

    it('service should defined', function () {
        expect(service).toBeDefined();
    });

    it('should call validation method to validNotId', () => {
        const result =  service.validation(Mock.dataNotId);

        result.then(data => expect(data).toEqual(Mock.dataNotId));
    });

    it('should call validation method to valid', () => {
        const result =  service.validation(Mock.data);

        result.then(data => expect(data).toEqual(Mock.data));
    });

     it('should call validation method to id', () => {
        const result =  service.validation({id:'5e17cab5b613222e9d19a76f'});

        result.then(data => expect(data).toEqual({id:'5e17cab5b613222e9d19a76f'}));
    });

    function mocks() {
        Mock.dataNotId = {
            name: "fulano",
            template: "<html></html>"
        },
            Mock.data = {
                id:'5e17cab5b613222e9d19a76f',
                name: "fulano",
                template: "<html></html>"
            }
    }
});