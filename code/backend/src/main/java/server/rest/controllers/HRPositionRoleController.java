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

/**
 * Controller for Position Role table in the database
 * Provides all the REST endpoints related to HR Position Roles and stored SQL procedures
 */
@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class HRPositionRoleController extends Controller {
    private static String getQuery = "select * from HRPositionRole";
    private static String addQuery = "insert into HRPositionRole values(? ,? ,?)";
    private static String editQuery = "update HRPositionRole set roleName=?, description=? where id=?";

    /**
     * Get all HR Roles
     * @return List of HR Roles in the database
     * @throws SQLException
     */
    public ArrayList<HRPositionRole> getHRRoles() throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HRPositionRole> roles = new ArrayList<HRPositionRole>();
        connection.openConnection();
        if(!connection.isConnected()) {
            throw new SQLException("Failed to connect to Database");
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
        return roles;
    }

    /**
     * Adds a HR Role in the database
     * @param roleName Name of the role
     * @param description Description
     * @return Newly created HRPositionRole
     * @throws SQLException
     */
    public HRPositionRole addRole(String roleName, String description) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        HRPositionRole role = new HRPositionRole(id, roleName, description);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(addQuery);
        int index = 1;
        st.setString(index++, id);
        st.setString(index++, roleName);
        st.setString(index++, description);
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to add HRPositioRole");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return role;
    }

    /**
     * Updates an existing Role in the database
     * @param id ID of the role to be updated
     * @param roleName Name of the role
     * @param description Description of the role
     * @return The Updated HRPositionRole
     * @throws SQLException
     */
    public HRPositionRole editRole(String id, String roleName, String description) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        HRPositionRole role = new HRPositionRole(id, roleName, description);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(editQuery);
        int index = 1;
        st.setString(index++, roleName);
        st.setString(index++,description);
        st.setString(index++, id);
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to add HRPositionRole");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return role;
    }

    /**
     * REST API link for viewing all HR Roles
     * @param token The unique token of the User making the API call
     * @return Response containing all HR Roles or an error response
     */
    @RequestMapping("/hrroles/view")
    public HRPositionRoleResponse hrroles(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return HRPositionRoleResponse.positionRoleFailure("User is not logged in");
        }
        ArrayList<HRPositionRole> roles;
        try {
            roles = this.getHRRoles();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HRPositionRoles Failed: " + e.getMessage());
            return HRPositionRoleResponse.positionRoleFailure(e.getMessage());
        }
        return new HRPositionRoleResponse(roles);
    }

    /**
     * REST API link to add a new HR Role
     * @param token The unique token of the User making the API call
     * @param roleName Name of the role
     * @param description Description of the role
     * @return Response containing the newly created Role or an error response
     */
    @RequestMapping("hrroles/add")
    public HRRolesResponse addHrrole(
            @RequestParam("token") String token,
            @RequestParam("roleName") String roleName,
            @RequestParam("description") String description) {
        if (!isUserLoggedIn(token)) {
            return HRRolesResponse.roleFailure("User is not logged in");
        }
        HRPositionRole role;
        try{
            role = this.addRole(roleName, description);
        } catch(SQLException e){
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add HRPositionRole failed: " + e.getMessage());
            return HRRolesResponse.roleFailure(e.getMessage());
        }
        return new HRRolesResponse(role);
    }

    /**
     * REST API link to update an existing role
     * @param token The unique token of the User making the API call
     * @param id The id of the role being updated
     * @param roleName Name of the role
     * @param description Description of the role
     * @return Response containing the Updated role or an error response
     */
    @RequestMapping("/hrroles/edit")
    public HRRolesResponse editHrrole(
            @RequestParam("token") String token,
            @RequestParam("id") String id,
            @RequestParam("roleName") String roleName,
            @RequestParam("description") String description){
        if (!isUserLoggedIn(token)) {
            return HRRolesResponse.roleFailure("User is not logged in");
        }
        HRPositionRole role;
        try {
            role = this.editRole(id, roleName, description);
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit HRPositionRole Failed: " + e.getMessage());
            return HRRolesResponse.roleFailure(e.getMessage());
        }
        return new HRRolesResponse(role);
    }
}
