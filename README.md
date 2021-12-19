# kaholo-plugin-google-cloud-iam
Kaholo plugin for integration with Google Cloud IAM Service.
Google Cloud Identity and Access Management (IAM) is used to create and manage permissions for Google Cloud resources.
**What you can do with Google Cloud IAM Plugin**
* **Set Project IAM Policy:** Manage access control and policies for your projects
* **Add Project Role Binding By Email:** Add new members to your project’s IAM policy under a specified role by entering their email address
* **Add Project Role Binding To Service Account:** Add project roles to service accounts
Optionally, you can use IAM Conditions to grant access to project members only if specified conditions are met
* **Get Project IAM Policy:** Get the IAM policy for a specified project
* **List Service Accounts:** List service accounts for a specified project
* **List Roles:** List roles within a specified project


##  Settings
1. Service Account Credentials (Vault) **Required If Not In Action** - Default service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Default Project ID (String) **Required If Not In Action** - Default project to use in methods.
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

## Method: Set Project IAM Policy
Set the specified project's IAM Policy.

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
3. Policy JSON (Text) **Required** - The policy to apply to the project, in JSON format. Can be provided either as a JSON string, a path to a local file on the agent, or as JS object from code. 
[Learn More](https://cloud.google.com/iam/docs/policies)

## Method: Add Project Role Binding By Email
Add new role bindings to the IAM policy of the specified project, using the specified members emails.

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
3. Members Emails (Text) **Required** - The emails of the new members to add to the project's IAM policy, under the specified role. Email can either refer to a user email or to a service account's email. Can enter multiple values by separating each with a new line.
[Learn More](https://cloud.google.com/iam/docs/policies)
4. Roles (Autocomplete) **Required** - The roles to apply to specified members. Can enter multiple values by entering roles as an array from code.
[Learn More](https://cloud.google.com/iam/docs/understanding-roles)
5. Condition (Text) **Optional** - Will apply all new bindings with specified condition. You can use IAM Conditions to define and enforce conditional, attribute-based access control for Google Cloud resources.
[Learn More](https://cloud.google.com/iam/docs/conditions-overview)

## Method: Add Project Role Binding To Service Account
Add new role bindings for the specified service account in the IAM policy of specified project.

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
3. Service Account (Autocomplete) **Required** - Add the role binding for the specified service account.
[Learn More](https://cloud.google.com/iam/docs/service-accounts)
4. Roles (Autocomplete) **Required** - The roles to apply to the service account. Can enter multiple values by entering roles as an array from code.
[Learn More](https://cloud.google.com/iam/docs/understanding-roles)
5. Condition (Text) **Optional** - Will apply all new bindings with specified condition. You can use IAM Conditions to define and enforce conditional, attribute-based access control for Google Cloud resources.
[Learn More](https://cloud.google.com/iam/docs/conditions-overview)

## Method: Get Project IAM Policy
Get the project's IAM policy.

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

## Method: List Service Accounts
List all service accounts in the specified project

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

## Method: List Roles
List all predefined google IAM roles and all custom roles in the specified project.

## Parameters
1. Service Account Credentials (Vault) **Required If Not In Settings** - Service account credentials
[Learn More](https://cloud.google.com/docs/authentication/production)
2. Project (Autocomplete) **Required If Not In Settings** - Project name
[Learn More](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
