package server.rest.responses;

import server.model.CostCenter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CostCentersResponse extends Response {
    private List<CostCenter>  costCenters;

    public static CostCentersResponse costCenterFailure(String msg) {
        List<CostCenter> costCenters = Collections.emptyList();
        CostCentersResponse response = new CostCentersResponse(costCenters);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public CostCentersResponse(List<CostCenter> costCenters) { this.costCenters = costCenters; }

    public List<CostCenter> getCostCenters() { return costCenters; }

}
