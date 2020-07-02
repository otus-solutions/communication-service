describe('ShutdownEventService-Suite_Tests', function () {
  let ShutdownEventService;

  beforeEach(function () {
    ShutdownEventService = require("../../app/utils/ShutdownEventService");

    jest.spyOn(process, 'exit').mockImplementation((n) => {
      console.log('process exit with', n);
    });
  });

  it('subscribe', async function () {
    let obj = {
      callbackSuccess: function(){ return Promise.resolve({})},
      callbackError: function(){ return Promise.reject({})}
    };
    jest.spyOn(obj, 'callbackSuccess');
    jest.spyOn(obj, 'callbackError');

    ShutdownEventService.subscribe('key1', obj.callbackSuccess);
    ShutdownEventService.subscribe('key2', obj.callbackError);
    await ShutdownEventService.fireEvent();

    expect(obj.callbackSuccess).toHaveBeenCalledTimes(1);
    expect(obj.callbackError).toHaveBeenCalledTimes(1);
  });

});