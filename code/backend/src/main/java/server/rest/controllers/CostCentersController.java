package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.CostCenter;
import server.rest.responses.CostCentersResponse;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Controller for Cost Centers Table
 * Provides all the REST endpoints related to Cost Centers and stored SQL procedures
 */
@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class CostCentersController extends Controller {
    private static String VIEW_COST_CENTER_QUERY = "SELECT * from CostCenter";

    /**
     * Get all the Cost Centers
     * @return The cost centers in the database
     * @throws SQLException if something goes wrong whilst querying the database
     */
    public ArrayList<CostCenter> getCostCenters() throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<CostCenter> costCenters = new ArrayList<CostCenter>();
        connection.openConnection();
        if (!connection.isConnected())
        {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(VIEW_COST_CENTER_QUERY);
        ResultSet set = st.executeQuery();
        while(set.next()) {
            CostCenter costCenter = new CostCenter(set.getString("id"),
                    set.getString("Location"));
            costCenters.add(costCenter);
        }
        connection.closeConnection();
        return costCenters;
    }

    /**
     * REST API link for viewing all the cost centers
     * @param token The unique token of the user making the API call
     * @return Response containing all the CostCenter information or an error response
     */
    @RequestMapping("/costcenters/view")
    public CostCentersResponse fxrates(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return CostCentersResponse.costCenterFailure("User is not logged in");
        }
        List<CostCenter> costCenters;
        try {
            costCenters = this.getCostCenters();
        } catch (SQLException e)
        {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Cost Centers Failed: " + e.getMessage());
            return CostCentersResponse.costCenterFailure(e.getMessage());
        }
        return new CostCentersResponse(costCenters);
    }
}
