package server.rest.responses;

import server.model.HRPositionRole;

import java.util.ArrayList;

/**
 * Response Object for HR Position Role REST API view link
 */
public class HRPositionRoleResponse extends Response {

    private ArrayList<HRPositionRole> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HRPositionRoleResponse positionRoleFailure(String msg) {
        ArrayList<HRPositionRole> roles = new ArrayList<HRPositionRole>();
        HRPositionRoleResponse response = new HRPositionRoleResponse(roles);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a HRPositionRole object
     * @param roles The roles that are supposed to be part of the Response
     */
    public HRPositionRoleResponse(ArrayList<HRPositionRole> roles) {
        this.data = roles;
    }

    /**
     * Gets all the roles
     * @return List of roles
     */
    public ArrayList<HRPositionRole> getData() {
        return data;
    }
}
