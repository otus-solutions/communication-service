const { Client } = require('@elastic/elasticsearch');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;

const client = new Client({ node: ELASTICSEARCH_HOSTNAME + ":" + 9200 });//TODO review port type string


/** @namespace application.app.services.ElasticsearchService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        async createIssue(issue) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await client.index({
                        index: 'issues',
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                        body: issue
                    });
                    console.log(body);
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        },
        async createMessage(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await client.index({
                        index: 'messages',
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                        body: message
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        },
        async queryIssue(query) {
            return client.search({
                index: 'issue',
                // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                body: {
                    query: {
                        match_all: {}
                        // match: { title: query}
                    }
                }
            });

            // return body.hits.hits.map(hit => {
            //     return { ...hit._source, _id: hit._id };
            // });
        },
        async updateIssueType(id, type) {
            //update to OPEN, CLOSE, FINALIZED
        }
    }
};
