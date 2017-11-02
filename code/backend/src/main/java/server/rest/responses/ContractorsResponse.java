package server.rest.responses;

import server.model.Contractor;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class ContractorsResponse extends Response {
    ArrayList<Contractor> contractors;
    public static ContractorsResponse contractorsFailure(String msg) {
        ArrayList<Contractor> contractors = new ArrayList<Contractor>();
        ContractorsResponse response = new ContractorsResponse(contractors);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public ContractorsResponse(ArrayList<Contractor> contractors) {
        this.contractors = contractors;
    }

    public ArrayList<Contractor> getContractors() {
        return contractors;
    }
}
