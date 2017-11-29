package server.rest.responses;

import server.model.Contractor;

import java.util.ArrayList;
import java.util.List;

/**
 * Response object for Contractors' REST API calls
 */
public class ContractorsResponse extends Response {
    List<Contractor> contractors;

    /**
     * Creates an Error Response
     * @param msg Error msg
     * @return An error Contractors response
     */
    public static ContractorsResponse contractorsFailure(String msg) {
        List<Contractor> contractors = new ArrayList<Contractor>();
        ContractorsResponse response = new ContractorsResponse(contractors);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a new Contractors response
     * @param contractors List of all contractors to be sent as part of the response
     */
    public ContractorsResponse(List<Contractor> contractors) {
        this.contractors = contractors;
    }

    /**
     * Gets the list of contractors
     * @return List of contractors
     */
    public List<Contractor> getContractors() {
        return contractors;
    }
}
