const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'})

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;


/** @namespace application.app.services.ElasticsearchService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        getClient() {
            //TODO review port type string
            //TODO catch connection error
            return new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});
        }

    }

};

setup();
test();

// let indices = [
//     'messages',
//     'issues'
// ];

async function createIndexWithMapping(index, mapping) {
    return client.indices.create({
        index: index,
        body: mapping
    });

}

async function setup() {
    //ToDo: verificar se está pronto
    if (!isSetupReady()) {
        return;
    }
}

function isSetupReady() {
    //testa se os indices existem
    console.log('\ntestar se os indices existem\n');
    // GET http://localhost:9200/_cat/indices?h=index
    return true;
}

async function test() {
    console.log("oi");
    const issuesMapping = {
        mappings: {
            properties: {
                // _id: {type: "keyword"},
                objectType: {type: "keyword"},
                sender: {type: "keyword"},
                group: {type: "keyword"},
                title: {type: "text"},
                text: {type: "text"},
                creationDate: {type: "date"},
                status: {type: "keyword"}
            }
        }
    }
    const messagesMapping = {
        mappings: {
            properties: {
                text: {type: 'text'},
                sender: {type: 'keyword'},
                issueId: {type: 'keyword'},
                // _id: {type: 'keyword'},
                creationDate: {type: 'date'}
            }
        }
    }

    try {
        const resp = await createIndexWithMapping('issues', issuesMapping);
        console.log(resp);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
    try {
        const resp = await createIndexWithMapping('messages', messagesMapping);
        console.log(resp);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}
