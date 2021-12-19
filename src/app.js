const parsers = require("./parsers");
const GoogleCloudIamService = require('./google.iam.service');

async function setProjectPolicy(action, settings){
    const { policyJson } = action.params;
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.setProjectPolicy({
        policyJson: parsers.json(policyJson)
    });
}

async function addPolicyBindingByEmail(action, settings){
    const { emails, roles, condition } = action.params;
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.addPolicyBinding({
        emails: parsers.array(emails),
        roles: parsers.autocomplete(roles),
        condition: parsers.string(condition)
    });
}

async function addPolicyBindingToServiceAccount(action, settings){
    const { serviceAccount, roles, condition } = action.params;
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.addPolicyBinding({
        emails: [parsers.autocomplete(serviceAccount)],
        roles: parsers.autocomplete(roles),
        condition: parsers.string(condition)
    });
}

async function getProjectPolicy(action, settings){
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.getProjectPolicy();
}

async function listServiceAccounts(action, settings){
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.listServiceAccounts();
}

async function listRoles(action, settings){
    const googleCloudIamService = GoogleCloudIamService.from(action.params, settings);
    return googleCloudIamService.listRoles();
} 

module.exports = {
    setProjectPolicy,
	addPolicyBindingByEmail,
	addPolicyBindingToServiceAccount,
    getProjectPolicy,
	listServiceAccounts,
	listRoles,
    // Autocomplete Functions
    ...require("./autocomplete")
}