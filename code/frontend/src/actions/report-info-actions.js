import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE, LOCALHOST } from '../constants/urls.js';

function getReportDataSuccessful(data) {
  return {
    type: ACTIONS.VIEW_REPORT_DATA,
    data
  };
}

function getReportDataFailed(error) {
  return {
    type: ACTIONS.VIEW_REPORT_DATA_FAILED,
    error
  };
}


export function viewReportData(token) {
  return dispatch => {
    return request
      .get(`${LOCALHOST}contractors/viewReportData`)
      .query({token})
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        let reportData = mapReportDataToHumanReadable(body.reportData);
        dispatch(getReportDataSuccessful(reportData));
      })
      .catch((err) => {
        dispatch(getReportDataFailed("Unable to retrieve data for reports"));
      });
  }
}

function mapReportDataToHumanReadable(reportData) {
  const fieldNamesMap = {
    'contractorName': 'Contractor Name',
    'billingMonth': 'Billing Month',
    'company': 'Company',
    'costCenter': 'Cost Center',
    'endDate': 'End Date',
    'workingMonth': 'Working Month',
    'startDate': 'Start Date',
    'totalMonthlyCost': 'Total Monthly Cost',
    'hiringManager': 'Hiring Manager'
  }
  let parsedReports = [];
  for (let report of reportData) {
    let parsedReport = {};
    for(let fieldName in fieldNamesMap) {
      let humanReadableName = fieldNamesMap[fieldName];
      parsedReport[humanReadableName] = report[fieldName];
    }
    parsedReports.push(parsedReport);
  }
  return parsedReports;
}