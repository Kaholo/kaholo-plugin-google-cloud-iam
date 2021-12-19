const { JWT } = require('google-auth-library');
const {removeUndefinedAndEmpty} = require('./helpers');
const parsers = require("./parsers");
const { google } = require('googleapis');
const cloudResourceManager = google.cloudresourcemanager('v1');
const iam = google.iam('v1');

module.exports = class GoogleCloudIamService{
    constructor({credentials, projectId}){
        if (!credentials || !projectId) throw "Must provide credentials and project!";
        this.credentials = credentials;
        this.projectId = projectId;
    }

    static from(params, settings){
        return new GoogleCloudIamService({
            credentials: parsers.json(params.creds || settings.creds),
            projectId: parsers.autocomplete(params.project || settings.project)
        });
    }
    
    getAuthClient(){
        return new JWT(
            this.credentials.client_email, null,
            this.credentials.private_key,
            ['https://www.googleapis.com/auth/cloud-platform']
        );
    }
    
    async setProjectPolicy({policyJson}){
        if (!policyJson) throw "Must provide a policy JSON";
        return (await cloudResourceManager.projects.setIamPolicy({
            resource: this.projectId,
            requestBody: {
                policy: policyJson
            },
            auth: this.getAuthClient()
        })).data;
    }
    
    async getProjectPolicy(){
        return (await cloudResourceManager.projects.getIamPolicy({
            resource: this.projectId,
            auth: this.getAuthClient()
        })).data;
    }
    
    async addPolicyBinding({emails, roles, condition}){
        if (!emails || !roles || !emails.length) throw "Didn't provide one of the required parameters!";
        if (!Array.isArray(roles)) roles = [roles];
        const currentPolicy = await this.getProjectPolicy();
        currentPolicy.bindings = (currentPolicy.bindings || []).concat(roles.map(role => 
           removeUndefinedAndEmpty({
                role, condition,
                members: emails.map(member => member.endsWith(".gserviceaccount.com") ? 
                (member.startsWith("serviceAccount:") ? member : "serviceAccount:" + member) :
                (member.startsWith("user:") ? member : "user:" + member))
           })
        ));
        return this.setProjectPolicy({policyJson: currentPolicy});
    }
    
    async listServiceAccounts(){
        return (await iam.projects.serviceAccounts.list({
            name: `projects/${this.projectId}`,
            auth: this.getAuthClient()
        })).data.accounts;
    }
    
    async listRoles(){
        const predefinedRoles = (await iam.roles.list({
            auth: this.getAuthClient()
        })).data.roles;
        const projectCustomRoles = (await iam.roles.list({
            parent: `projects/${this.projectId}`,
            auth: this.getAuthClient()
        })).data.roles || [];
        return predefinedRoles.concat(projectCustomRoles);
    }
    
    async listProjects(){ 
        return (await cloudResourceManager.projects.list({
            auth: this.getAuthClient()
        })).data.projects;
    }
}