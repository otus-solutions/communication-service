/** @namespace application.app.services.IssueService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const ISSUES_INDEX = 'issues';

    return {
        async createIssue(issue) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().index({
                        index: ISSUES_INDEX,
                        body: issue
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async queryIssue(query) {
            return client.search({
                index: 'issue',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            });
        },

        async listSenderIssues(senderId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        body: {
                            query: {
                                match: { sender: senderId }
                            },
                            // size:1,
                            // from:0,
                            //order
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async getIssuesByGroup(groupId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        body: {
                            query: {
                                match: { group: groupId }
                            },
                            // size:1,
                            // from:0,
                            //order
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async getIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().get({
                        index: ISSUES_INDEX,
                        id: issueId
                    });
                    resolve(Response.success(transform(body)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async updateIssueType(id, type) {
            //update to OPEN, CLOSED, FINALIZED
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().update({
                        index: ISSUES_INDEX,
                        id: id,
                        body: {
                            doc: {
                                status: type
                            }
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async existIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().exists({
                        index: ISSUES_INDEX,
                        id: issueId
                    });

                    body ? resolve(body) : reject(Response.notFound(body));
                   
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },
    };

    function transform(hit) {
        return { ...hit._source, _id: hit._id };
    }
};
