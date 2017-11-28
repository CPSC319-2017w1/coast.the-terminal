import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

function addContractorSuccessful() {
  return {
    type: ACTIONS.ADD_CONTRACTOR
  };
}

function addContractorFailed(error) {
  return {
    type: ACTIONS.ADD_CONTRACTOR_FAILED,
    error
  };
}

function editContractorSuccessful() {
  return {
    type: ACTIONS.EDIT_CONTRACTOR
  };
}

function editContractorFailed(error) {
  return {
    type: ACTIONS.EDIT_CONTRACTOR_FAILED,
    error
  };
}

function viewAllDataFailed(error) {
  return {
    type: ACTIONS.VIEW_ALL_DATA_FAILED,
    error
  };
}

function viewAllData(data) {
  return {
    type: ACTIONS.VIEW_ALL_DATA,
    data
  };
}

export function addContractor(contractorData, projectData, tableData, callback, token) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/add`)
      .query(Object.assign({}, contractorData, {token}))
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }

        let contractorId = body.contractors[0].id;
        return contractorId;
      })
      .then((contractorId) => {
        return addEngagementContract(projectData, contractorId, tableData, token);
      })
      .then((responses) => {
        for(let res of responses) {
          let body = res.body;
          if(!res.ok || body.error) {
            throw new Error(body.errorMessage);
          }
        }
        dispatch(hasStoppedLoading());
        dispatch(addContractorSuccessful());
        callback();
      })
      .catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(addContractorFailed(err.message));
        callback();
      });
  };
}

function addEngagementContract(projectData, contractorId, tableData, token) {
  let allEngagementPromises = [];
  for(let project of projectData) {
    project['contractorId'] = contractorId;
    project['resourceId'] = '';
    project = conformDropdownValuesToDefault(project, tableData);
    let req = request
      .post(`${LIVE_SITE}contractors/add/engagementContract`)
      .query(Object.assign({}, project, {token}));
    allEngagementPromises.push(req);
  }

  return Promise.all(allEngagementPromises);
}

function conformDropdownValuesToDefault (project, tableData) {
  //todo change this to less hacky fix
  const REQUIRED_FIELDS = {'hrPositionId': 'hrroles',
    'hrPayGradeId': 'paygrades',
    'costCenterId': 'costcenters',
    'reportingManagerId': 'hiringmanagers',
    'mainSkillId': 'skills',
    'rateType': 'ratetypes'};
  for(let reqField in REQUIRED_FIELDS) {
    let actualFieldName = REQUIRED_FIELDS[reqField];
    if(!project.hasOwnProperty(reqField)){
      if(tableData.hasOwnProperty(actualFieldName)) {
        project[reqField] = tableData[actualFieldName].data[0].id;
      } else {
        project[reqField] = project[actualFieldName][0];
      }
    }
  }

  return project;
}

export function editContractor(contractorData, projectData, tableData, numNewContracts, callback, token) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/edit`)
      .query(Object.assign({}, contractorData, {token}))
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        let contractorId = body.contractors[0].id;
        return contractorId;
      })
      .then((contractorId) => {
        let engagementPromises = [];
        if (numNewContracts > 0) {
          let newContractsPromises = addEngagementContract(projectData.slice(projectData.length - numNewContracts), contractorId, tableData, token);
          engagementPromises.push(newContractsPromises);

        }

        let edittedContractorPromises = editEngagementContract(projectData.slice(0, projectData.length - numNewContracts), contractorId, token);
        engagementPromises.push(edittedContractorPromises);
        return Promise.all(engagementPromises);

      })
      .then((responses) => {
        for(let responseArray of responses) {
          for (let res of responseArray) {
            let body = res.body;
            if (!res.ok || body.error) {
              throw new Error(body.errorMessage);
            }
          }
        }
        dispatch(hasStoppedLoading());
        callback();
      })
      .catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(editContractorFailed(err.message));
      });
  };
}

export function editEngagementContract(projectData, contractorId, token) {
  let allEngagementPromises = [];
  for(let project of projectData) {
    project['contractorId'] = contractorId;
    project['resourceId'] = '';
    let req = request
      .post(`${LIVE_SITE}contractors/edit/engagementContract`)
      .query(Object.assign({}, project, {token}));
    allEngagementPromises.push(req);
  }

  return Promise.all(allEngagementPromises);
}

export function viewAllContractorDataSeparateRows(token) {
  return viewAllContractorData(generateContractorRows, token);
}

export function viewAllContractorDataKeepOriginal(token) {
  return viewAllContractorData(keepOriginalAndGenerateRows, token);
}



function viewAllContractorData(parsingFunc, token) {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}contractors/viewAllData`)
      .query({token})
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        let contractors = parsingFunc(body.contractors);
        dispatch(viewAllData(contractors));
      })
      .catch((err) => {
        dispatch(viewAllDataFailed(err.message));
      });
  };
}

function keepOriginalAndGenerateRows(data) {
  let parsedData = {};
  parsedData['originalData'] = data;
  parsedData['humanReadableData'] = generateContractorRows(data);
  return parsedData;
}


function generateContractorRows(data) {
  const CONTRACTS_FIELD = 'contracts';
  let contractors = [];
  const contractorFields = {
    'id': 'id',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'agencySource': 'Agency Source',
    'status': 'Status',
    'contracts': 'contracts'};

  const contractFields = {'chargeType': 'Charge Type',
    'currencyCode': 'Currency Code',
    'dailyAllowance': 'Allowance Expense',
    'endDate': 'End Date',
    //'id': 'engagement-id',
    'hourlyRate': 'Hourly Rate',
    'originalDocumentation': 'Original Documentation',
    'poRefNum': 'PO Reference Number',
    'projectName': 'Project Name',
    'rateType': 'Rate Type',
    'rehire': 'Rehire',
    'startDate': 'Start Date',
    'terminationNum': 'Termination Number',
    'timeMaterialTerms': 'Time And Material Terms'};

  const contractObjectFields = {
    'costCenter': {
      //"id": "costcenter-id",
      'location': 'Location'
    },
    'hrPayGrade': {
      // "id": "hrPayGrade-id",
      'startAmount': 'Pay Grade Start Amount',
      'endAmount': 'Pay Grade End Amount',
      'name': 'Pay Grade Name'
    },
    'hrPositionRole': {
      // "id": "hrPosition-id",
      'roleName': 'HR Role Name',
      'description': 'HR Role Description'
    },
    'mainSkill': {
      // "id": "skill-id",
      'name': 'Skill Name',
      'description': 'Skill Description',
      'type': 'Skill Type'
    },
    'hiringManager': {
      'firstName': 'Reporting Manager First Name',
      'lastName': 'Reporting Manager Last Name'
    }
  };

  for(let contractor of data) {
    let contractorParsed = {};
    for(let contractorField in contractorFields) {
      if(contractorField !== CONTRACTS_FIELD){
        let humanReadableName = contractorFields[contractorField];
        contractorParsed[humanReadableName] = contractor[contractorField];
      } else {
        //new row for each contract (even with same contractor data)
        let saveContractorParsed = Object.assign({}, contractorParsed);
        let contracts = contractor[CONTRACTS_FIELD];
        for(let contract of contracts) {
          //extract out string fields in each contract
          for (let contractField in contractFields) {
            let humanReadableName = contractFields[contractField];
            contractorParsed[humanReadableName] = contract[contractField];
          }
          //extract out object type fields in each contract
          for(let contractObjectFieldName in contractObjectFields){
            let contractObjectValues = contract[contractObjectFieldName];
            let contractObjectSchema = contractObjectFields[contractObjectFieldName];

            for(let contractObjectFieldName in contractObjectSchema){
              if(contractObjectSchema.hasOwnProperty(contractObjectFieldName)) {
                let humanReadableName = contractObjectSchema[contractObjectFieldName];
                contractorParsed[humanReadableName] = contractObjectValues[contractObjectFieldName];
              }
            }
          }
          contractors.push(contractorParsed);
          contractorParsed = Object.assign({}, saveContractorParsed);
        }
      }
    }
  }

  return contractors;
}

//taken from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects/19101235#19101235
function flattenData(data) {
  var result = {};
  function recurse (cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for(var i=0, l=cur.length; i<l; i++)
        recurse(cur[i], prop + '_');
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop +p : p);
      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
}
