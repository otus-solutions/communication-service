/** @namespace application.app.services.ConfigurationElasticsearchService **/
/*
const app = require('../../app');
const Response = require('../utils/Response');
const IssueService = require('../services/IssueService');
// console.log(Response);
console.log(IssueService(app));
// console.log(JSON.stringify(IssueService()));
*/

module.exports = function (application) {
    const Response = application.app.utils.Response;
    const IssueService = application.app.services.IssueService;

    async function setup() {

        //ToDo: verificar se está pronto
        // if (!isSetupReady()) {
        //     return;
        // }

        const issuesMapping = {
            mappings: {
                properties: {
                    objectType: {type: "keyword"},
                    sender: {type: "keyword"},
                    group: {type: "keyword"},
                    title: {type: "text"},
                    text: {type: "text"},
                    creationDate: {type: "date"},
                    status: {type: "keyword"}
                }
            }
        };
        // const messagesMapping = {
        //     mappings: {
        //         properties: {
        //             sender: {type: 'keyword'},
        //             text: {type: 'text'},
        //             creationDate: {type: 'date'},
        //             issueId: {type: 'keyword'}
        //         }
        //     }
        // }

        const {body} = await IssueService.createIndexWithMapping(issuesMapping)
        // const {body} =  IssueService.createIndexWithMapping(issuesMapping)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            });
        console.log(body);
        // console.log(JSON.stringify(e));


        // try {
        //     const resp = await createIndexWithMapping('messages', messagesMapping);
        //     console.log(resp);
        // } catch (e) {
        //     console.log(JSON.stringify(e));
        // }

    }
};



// test();
// setup();

// let indices = [
//     'messages',
//     'issues'
// ];

