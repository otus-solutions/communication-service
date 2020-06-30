let data = {};
data.issue = {
    objectType: "Issue",
    sender: "5",
    group: "3",
    title: "Não consigo preencher a atividade TCLEC",
    text: "Quando tento responder uma pergunta, não consigo inserir a resposta",
    creationDate: "2020-04-20T15:30:07.533Z",
    status: "OPEN"
};
data.issueId = 'fqX38XIBU9yBIlNWf2l5';
data.issueHit = {
    _index: 'issues',
    _type: '_doc',
    _id: data.issueId,
    _score: null,
    _source: {
        sender: "5",
        group: "3",
        title: "Não consigo preencher a atividade TCLEC",
        text: "Quando tento responder uma pergunta, não consigo inserir a resposta",
        creationDate: "2020-04-20T15:30:07.533Z",
        status: "OPEN"
    },
    sort: [ 1592667007533, '3', '4' ]
};

data.issuesSearchSettings = {
    "currentQuantity": 0,
    "quantityToGet": 10,
    "order": {
        "fields": [
            "creationDate",
            "group",
            "sender"
        ],
        "mode": 1
    },
    "filter": {
        "status": "OPEN"
    }
};

data.message = {
    text: "conexão ok, qual próximo passo",
    sender: "fulano3@email.com",
    creationDate: "2020-04-12T11:30:07.533Z",
    issueId: data.issueId
};
data.messageId = 'ylSfA3MBWwgW4b7GqwXi';
data.messageHit = {
    _index: "messages",
    _type: '_doc',
    _id: data.messageId,
    _score: null,
    _source: {
        text: "conexão ok, qual próximo passo",
        sender: "fulano3@email.com",
        creationDate: "2020-04-12T11:30:07.533Z",
        issueId: data.issueId
    },
    sort: [ 1592667007533, '3', '4' ]
};

data.client = {
    index: function(obj) {return {}},
    search: function(obj) {return {}},
    get: function(issueId) {return {}},
    update: function(obj) {return {}},
    exists: function(obj) {return {}},
    delete: function(obj) {return {}},
    deleteByQuery: function(obj) {return {}},
};

data.filter = {
        "currentQuantity": 0,
        "quantityToGet": 10,
        "order": {
            "fields": [
                "group",
                "sender",
                "creationDate"
            ],
            "mode": -1
        },
        "filter": {
            "sender": "5",
            "group": "3"
        }
    };


module.exports = data;
