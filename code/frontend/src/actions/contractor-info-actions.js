import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE, LOCALHOST } from '../constants/urls.js';
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

function viewContractorSuccessful(data) {
  return {
    type: ACTIONS.VIEW_CONTRACTORS,
    data
  };
}

function viewContractorFailed(error) {
  return {
    type: ACTIONS.VIEW_CONTRACTORS_FAILED,
    error
  };
}

export function addContractor(contractorData, projectData, tableData, callback) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/add`)
      .query(contractorData)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }

        let contractorId = body.contractors[0].id;
        return contractorId;
      })
      .then((contractorId) => {
        return addEngagementContract(projectData, contractorId, tableData);
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

function addEngagementContract(projectData, contractorId, tableData) {
   let allEngagementPromises = [];
   for(let project of projectData) {
       project["contractorId"] = contractorId;
       project["resourceId"] = "";
       project = conformDropdownValuesToDefault(project, tableData);
       let req = request
        .post(`${LOCALHOST}contractors/add/engagementContract`)
        .query(project);
       allEngagementPromises.push(req);
   }

   return Promise.all(allEngagementPromises);
}

function conformDropdownValuesToDefault (project, tableData) {
  //todo change this to less hacky fix
  const REQUIRED_FIELDS = {"hrPositionId": "hrroles",
                          "hrPayGradeId": "paygrades",
                          "costCenterId": "costcenters",
                          "reportingManagerId": "hiringmanagers",
                          "mainSkillId": "skills",
                          "poNum": "refnos",
                          "rateType": "ratetypes"};
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

export function editContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/edit`)
      .query(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(editContractorSuccessful());
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(editContractorFailed(err.message));
      });
  };
}

export function viewContractors() {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get(`${LIVE_SITE}contractors/view`)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(viewContractorSuccessful(body.contractors));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(viewContractorFailed(err.message));
      });
  };
}
