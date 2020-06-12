'use strict';

const {Client} = require('@elastic/elasticsearch');


const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;

const client = new Client({node: ELASTICSEARCH_HOSTNAME + ":" + 9200});


/** @namespace application.app.services.ElasticsearchService **/
module.exports = function (application) {
    return {
        async createIssue(issue) {
            return client.index({
                index: 'issues',
                // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                body: issue
            });
        }
    }
};
queryIssue()
    .then(result => {
        console.log('then');
        // console.log(JSON.stringify(result));

    });

async function queryIssue(query) {
    const { body } =  await client.search({
        index: 'issues',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            query: {
                match_all: {}
                // match: { title: query}
            }
        }
    });

    return body.hits.hits.map(hit => {
        return {...hit._source, _id:hit._id};
    });
}




async function createMessage(message) {
    await client.index({
        index: 'message',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: message
    });
}



async function updateIssueType(id, type) {
//update to OPEN, CLOSE, FINALIZED
}


function create() {
    this.createIssue({
            "objectType": "Issue",
            "sender": "oid string do participant",
            "group": "group_id - id do centro. Resolvido no otus-api",
            "title": "Primeira issue. ",
            "text": "Quando tento responder uma pergunta, não consigo inserir a resposta",
            "creationDate": "2020-06-10T21:08:50.824Z",
            "status": "OPEN"
        }
    ).then(result => {
        console.log('result');
        console.log(result);
    }).catch(console.log);
}
