package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HRPositionRole;
import server.rest.responses.HRRolesResponse;
import server.rest.responses.HRPositionRoleResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class HRPositionRoleController extends Controller {
    private static String getQuery = "select * from HRPositionRole";
    private static String addQuery = "insert into HRPositionRole values(? ,? ,?)";
    private static String editQuery = "update HRPositionRole set roleName=?, description=? where id=?";

    @RequestMapping("/hrroles/view")
    public HRPositionRoleResponse hrroles() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HRPositionRole> roles = new ArrayList<HRPositionRole>();

        try {
            connection.openConnection();
            if(!connection.isConnected()) {
                return HRPositionRoleResponse.positionRoleFailure("Failed to connect to Database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                HRPositionRole role = new HRPositionRole(set.getString("id"),
                                                         set.getString("roleName"),
                                                         set.getString("description"));
                roles.add(role);
            }
            connection.closeConnection();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HRPositionRoles Failed: " + e.getMessage());
            return HRPositionRoleResponse.positionRoleFailure(e.getMessage());
        }
        return new HRPositionRoleResponse(roles);
    }

    @RequestMapping("hrroles/add")
    public HRRolesResponse addHrrole(
            @RequestParam("roleName") String roleName,
            @RequestParam("description") String description) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        HRPositionRole role = new HRPositionRole(id, roleName, description);
        try{
            connection.openConnection();
            if (!connection.isConnected()) {
                return HRRolesResponse.roleFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(addQuery);
            int index = 1;
            st.setString(index++, id);
            st.setString(index++, roleName);
            st.setString(index++, description);
            int success = st.executeUpdate();
            if (success == 0) {
                return HRRolesResponse.roleFailure("Failed to add HRPositioRole");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch(SQLException e){
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add HRPositionRole failed: " + e.getMessage());
            return HRRolesResponse.roleFailure(e.getMessage());
        }
        return new HRRolesResponse(role);
    }

    @RequestMapping("/hrroles/edit")
    public HRRolesResponse editHrrole(
            @RequestParam("id") String id,
            @RequestParam("roleName") String roleName,
            @RequestParam("description") String description){
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        HRPositionRole role = new HRPositionRole(id, roleName, description);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return HRRolesResponse.roleFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(editQuery);
            int index = 1;
            st.setString(index++, roleName);
            st.setString(index++,description);
            st.setString(index++, id);
            int success = st.executeUpdate();
            if (success == 0) {
                return HRRolesResponse.roleFailure("Failed to add HRPositionRole");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit HRPositionRole Failed: " + e.getMessage());
            return HRRolesResponse.roleFailure(e.getMessage());
        }
        return new HRRolesResponse(role);
    }
}
