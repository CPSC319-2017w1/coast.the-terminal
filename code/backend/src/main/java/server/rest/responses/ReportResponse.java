package server.rest.responses;

import server.model.ReportData;

import java.util.Collections;
import java.util.List;

public class ReportResponse extends Response {
    List<ReportData> reportData;
    public static ReportResponse reportsFailure(String msg) {
        List<ReportData> reportData = Collections.emptyList();
        ReportResponse response = new ReportResponse(reportData);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public ReportResponse(List<ReportData> reportData) {
        this.reportData = reportData;
    }

    public List<ReportData> getReportData() {
        return reportData;
    }
}
