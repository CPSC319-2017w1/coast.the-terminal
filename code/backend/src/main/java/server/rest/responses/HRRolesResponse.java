package server.rest.responses;

import server.model.HRPositionRole;

/**
 * Created by vaast on 13/11/2017.
 */
public class HRRolesResponse extends Response {

    HRPositionRole role;

    public static HRRolesResponse roleFailure(String msg) {
        HRPositionRole role = new HRPositionRole("", "", "");
        HRRolesResponse response = new HRRolesResponse(role);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HRRolesResponse(HRPositionRole role) {
        this.role = role;
    }

    public HRPositionRole getRole() {
        return role;
    }
}
