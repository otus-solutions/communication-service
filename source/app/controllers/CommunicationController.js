/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const CommunicationService = application.app.services.CommunicationService;

  return {
    async communication(data) {
      return CommunicationService.communication(data)
    }
  };
};
