/** @namespace application.app.services.MessageService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const MESSAGES_INDEX = 'messages';

    return {
        async createMessage(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await ElasticsearchService.getClient().index({
                        index: MESSAGES_INDEX,
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                        body: message
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        }
    };
};
