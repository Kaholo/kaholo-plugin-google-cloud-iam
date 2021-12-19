const parsers = require("./parsers");
const { helper } = require("./helpers");

const GoogleCloudIamService = require('./google.iam.service');
const MAX_RESULTS = 10;

// auto complete helper methods

function mapAutoParams(autoParams){
  const params = {};
  autoParams.forEach(param => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

/***
 * @returns {[{id, value}]} filtered result items
 ***/
function handleResult(result, query, keyField, valField){
  if (!result || result.length == 0) return [];
  if (!keyField) {
    keyField = "id";
    valField = "name";
  }
  const items = result.map(item => getAutoResult(item[keyField], item[valField]));
  return filterItems(items, query);
}

/***
 * @returns {{id, value}} formatted autocomplete item
 ***/
function getAutoResult(id, value) {
  return {
    id: id || value,
    value: value || id
  };
}

function filterItems(items, query){
  if (query){
    const qWords = query.split(/[. ]/g).map(word => word.toLowerCase()); // split by '.' or ' ' and make lower case
    items = items.filter(item => qWords.every(word => item.value.toLowerCase().includes(word)));
    items = items.sort((word1, word2) => word1.value.toLowerCase().indexOf(qWords[0]) - word2.value.toLowerCase().indexOf(qWords[0]));
  }
  return items.splice(0, MAX_RESULTS);
}

function listAuto(listFuncName, fields) {
  return async (query, pluginSettings, triggerParameters) => {
    const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters);
    const client = GoogleCloudIamService.from(params, settings);
    const result = await client[listFuncName]({
      query: parsers.string(query),
      ...params
    });
    const items = handleResult(result, query, ...fields);
    return items;
  }
}


module.exports = {
  listProjectsAuto: listAuto("listProjects", ["name", "displayName"]),
  listRolesAuto: listAuto("listRoles", ["name", "title"]),
  listServiceAccountsAuto: listAuto("listServiceAccounts", ["email", "displayName"])
}
