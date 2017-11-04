package server.rest.responses;

import server.model.Contractor;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by vaast on 31/10/2017.
 */
public class ContractorsResponse extends Response {
    List<Contractor> contractors;
    public static ContractorsResponse contractorsFailure(String msg) {
        List<Contractor> contractors = new ArrayList<Contractor>();
        ContractorsResponse response = new ContractorsResponse(contractors);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public ContractorsResponse(List<Contractor> contractors) {
        this.contractors = contractors;
    }

    public List<Contractor> getContractors() {
        return contractors;
    }
}
