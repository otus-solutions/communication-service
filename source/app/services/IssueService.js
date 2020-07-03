/** @namespace application.app.services.IssueService **/
module.exports = function (application) {
    const ISSUES_INDEX = 'issues';
    const INDEX_LIMIT = 10000;

    const Response = application.app.utils.Response;
    const ElasticsearchService = require('./ElasticsearchService');
    const IssueFactory = application.app.models.IssueFactory;

    return {
        async createIssue(issue) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().index({
                        index: ISSUES_INDEX,
                        body: issue,
                        refresh: true
                    });
                    resolve(Response.success(body._id));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async queryIssue(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (Object.keys(data).length === 0) {
                        return reject(Response.notAcceptable());
                    }

                    let query = Object.entries(data.filter).map(([key, value]) => {
                        let json = {};
                        json.match = {};
                        if (key === "creationDate") {
                            let dayPart = value.split('T')[0];
                            json = {
                                "range": {
                                    "creationDate": {
                                        "lte": dayPart + 'T23:59:59.000Z'
                                    }
                                }
                            }
                        } else {
                            json.match[key] = value
                        }

                        return json;
                    });

                    if (query.length === 0) {
                        query = {match_all: {}}
                    }

                    let order = (data.order.mode === 1) ? "asc" : "desc";
                    let orderFields = data.order.fields.map(field => {
                        let obj = {};
                        obj[field] = order;
                        return obj;
                    });

                    const {body} = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        from: data.currentQuantity,
                        size: data.quantityToGet,
                        body: {
                            query: {
                                bool: {
                                    must: query
                                }
                            },
                            sort: orderFields
                        }
                    });

                    resolve(Response.success(body.hits.hits.map(IssueFactory.fromHit)));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async listSenderIssues(senderId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        size: INDEX_LIMIT,
                        body: {
                            query: {
                                match: { sender: senderId }
                            }
                        }
                    });
                    resolve(Response.success(body.hits.hits.map(IssueFactory.fromHit)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound());
                }
            });
        },

        async getIssuesByGroup(groupId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        size: INDEX_LIMIT,
                        body: {
                            query: {
                                match: { group: groupId }
                            }
                        }
                    });
                    resolve(Response.success(body.hits.hits.map(IssueFactory.fromHit)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound());
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
                    resolve(Response.success(IssueFactory.fromHit(body)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound());
                }
            });
        },

        async updateIssueType(id, type) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().update({
                        index: ISSUES_INDEX,
                        id: id,
                        refresh: true,
                        body: {
                            doc: {
                                status: type
                            }
                        }
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.notFound());
                }
            });
        },

        async existIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().exists({
                        index: ISSUES_INDEX,
                        id: issueId,
                        refresh: true
                    });

                    body ? resolve(body) : reject(Response.notFound(body));

                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async deleteIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().delete({
                        index: ISSUES_INDEX,
                        id: issueId,
                        refresh: true
                    });

                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound());
                }
            });
        }
    };
};
