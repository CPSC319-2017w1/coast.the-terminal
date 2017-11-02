package server.rest.responses;

import server.model.HRPositionRole;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class HRPositionRoleResponse extends Response {

    private ArrayList<HRPositionRole> hrPositionRoles;

    public static HRPositionRoleResponse positionRoleFailure(String msg) {
        ArrayList<HRPositionRole> roles = new ArrayList<HRPositionRole>();
        HRPositionRoleResponse response = new HRPositionRoleResponse(roles);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HRPositionRoleResponse(ArrayList<HRPositionRole> roles) {
        this.hrPositionRoles = roles;
    }

    public ArrayList<HRPositionRole> getHrPositionRoles() {
        return hrPositionRoles;
    }
}
