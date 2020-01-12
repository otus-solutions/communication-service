/** @namespace application.app.services.ValidationService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        async validation(data) {
            return new Promise(async (resolve, reject) => {
                let valid = JSON.stringify(['id','name','template']);
                let validNotId = JSON.stringify(['name','template']);
                let dataValid = JSON.stringify(Object.keys(data));

                if(data){
                    Object.values(data).forEach(value => {
                        if(!value){
                            reject(Response.notAcceptable('Campo não foi preenchido.'));
                        }
                    });
                    if(dataValid === valid){
                        resolve(data);
                    } else if(dataValid === validNotId){
                        resolve(data);
                    } else if(data.id) {
                        resolve(data);
                    } else{
                        reject(Response.notAcceptable('Campo não foi encontrado.'));
                    }
                } else {
                    reject(Response.notAcceptable());
                }
            })
        }
    }
};