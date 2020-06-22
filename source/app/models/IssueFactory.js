/** @namespace application.app.models.IssueFactory**/
module.exports = function () {
    return {
        create: (json) => {
            let object = new Issue(json);
            object.status = 'OPEN';

            return object;
        },
        fromHit: (hit) => {
            let object = new Issue(hit._source);
            object._id = hit._id;
            return object;
        },
        getMapping: () => {
            return {
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
        }
    };
};

function Issue(json) {
    let self = {
        ...json,
        ...this
    };


    self.isValid = () => {
        return true;
    };

    self.toJSON = () => {
        let json = {};
        json._id = self._id;
        json.sender = self.sender;
        json.group = self.group;
        json.status = self.status;
        json.title = self.title;
        json.text = self.text;
        json.creationDate = self.creationDate;
        return json;
    };

    return self;
}
