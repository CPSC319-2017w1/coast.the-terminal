package server.rest.responses;

import server.model.CostCenter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Response object for CostCenters' REST API links
 */
public class CostCentersResponse extends Response {
    private List<CostCenter>  data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static CostCentersResponse costCenterFailure(String msg) {
        List<CostCenter> costCenters = Collections.emptyList();
        CostCentersResponse response = new CostCentersResponse(costCenters);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a CostCenters Response
     * @param costCenters List of cost centers that are part of the response
     */
    public CostCentersResponse(List<CostCenter> costCenters) { this.data = costCenters; }

    /**
     * Gets all the cost centes
     * @return List of cost centers
     */
    public List<CostCenter> getData() { return data; }

}
