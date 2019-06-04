const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

function _createAuthClient(action,settings){
    let keysParam = action.params.CREDENTIALS || settings.CREDENTIALS
    let keys;

    if (typeof keysParam != 'string'){
        keys = keysParam;
    } else {
        try{
            keys = JSON.parse(keysParam)
        }catch(err){
            throw new Error("Invalid credentials JSON");
        }
    }

    return new JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/cloud-platform'],
    );
}

function attachUserToResource(action, settings) {

    let cloudResourceManager = google.cloudresourcemanager('v1');
    let resourceId = action.params.RESOURCEID;
    let userEmail = action.params.EMAIL;
    let role = action.params.ROLE;

    return new Promise((resolve, reject) => {
        const client = _createAuthClient(action,settings);

        var request = {
            resource_: resourceId,
            auth: client
        };

        cloudResourceManager.projects.getIamPolicy(request, (err, res) => {
            if (err) {
                return reject(err);
            }

            let data = res.data;
            data.bindings.push({
                members: [
                    `user:${userEmail}`
                ],
                role: role
            })

            var addRequest = {
                resource_: resourceId,
                resource: {
                    policy: {
                        bindings: data.bindings
                    }
                },
                auth: client,
            };

            cloudResourceManager.projects.setIamPolicy(addRequest, (addErr, addRes) => {
                if (addErr)
                    return reject(addErr);

                resolve(addRes.data);
            })
        })
    })
}

function setIamPolicy(action, settings) {

    let cloudResourceManager = google.cloudresourcemanager('v1');
    let resourceId = action.params.RESOURCEID;
    let userEmail = action.params.EMAIL;
    let role = action.params.ROLE;

    return new Promise((resolve, reject) => {
        const client = _createAuthClient(action,settings);
        let request = {
            resource_: resourceId,
            resource: {
                policy: {
                    bindings: {
                        members: [
                            `user:${userEmail}`,
                        ],
                        role: role
                    }
                }
            },
            auth: client,
        };

        cloudResourceManager.projects.setIamPolicy(request, (err, response) => {
            if (err)
                return reject(err);

            resolve(response);
        })
    })
}

module.exports = {
    attachUserToResource : attachUserToResource,
    setIamPolicy: setIamPolicy
}