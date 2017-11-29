package server.rest.responses;

import server.model.HRPositionRole;

/**
 * Response object for REST API add and edit links of HRRoles
 */
public class HRRolesResponse extends Response {

    HRPositionRole role;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HRRolesResponse roleFailure(String msg) {
        HRPositionRole role = new HRPositionRole("", "", "");
        HRRolesResponse response = new HRRolesResponse(role);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a HRRolesResponse object
     * @param role The role that is part of the response
     */
    public HRRolesResponse(HRPositionRole role) {
        this.role = role;
    }

    /**
     * Gets the role
     * @return The role object
     */
    public HRPositionRole getRole() {
        return role;
    }
}
