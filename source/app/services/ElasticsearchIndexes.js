/** @namespace application.app.services.ElasticsearchIndexes **/
module.exports = function (application) {
    const MessageFactory = application.app.models.MessageFactory;
    const IssueFactory = application.app.models.IssueFactory;

    return [
        {
            indice: 'messages',
            mapping: MessageFactory.getMapping()
        },
        {
            indice: 'issues',
            mapping: IssueFactory.getMapping()
        }
    ];

};
