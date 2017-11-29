package server.rest.responses;

import server.model.ReportData;

import java.util.Collections;
import java.util.List;

/**
 * Response object for viewReportData REST API link
 */
public class ReportResponse extends Response {
    List<ReportData> reportData;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static ReportResponse reportsFailure(String msg) {
        List<ReportData> reportData = Collections.emptyList();
        ReportResponse response = new ReportResponse(reportData);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a Report Response object
     * @param reportData Data that is part of the response object
     */
    public ReportResponse(List<ReportData> reportData) {
        this.reportData = reportData;
    }

    /**
     * Gets the list of report data
     * @return The list of report data
     */
    public List<ReportData> getReportData() {
        return reportData;
    }
}
