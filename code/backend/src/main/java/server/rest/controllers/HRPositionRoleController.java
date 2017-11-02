package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HRPositionRole;
import server.rest.responses.HRPositionRoleResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class HRPositionRoleController extends Controller {
    private static String getQuery = "select * from HRPositionRole;";

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
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HRPositionRoles Failed: " + e.getMessage());
            return HRPositionRoleResponse.positionRoleFailure(e.getMessage());
        }
        return new HRPositionRoleResponse(roles);
    }
}
