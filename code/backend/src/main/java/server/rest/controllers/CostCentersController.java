package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
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

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class CostCentersController extends Controller {
    private static String VIEW_COST_CENTER_QUERY = "SELECT * from CostCenter";

    @RequestMapping("/costcenters/view")
    public CostCentersResponse fxrates() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        List<CostCenter> costCenters = new ArrayList<>();
        try {
            connection.openConnection();
            if (!connection.isConnected())
            {
                return CostCentersResponse.costCenterFailure("Failed to connect to the database");
            }
            PreparedStatement st = connection.getPreparedStatement(VIEW_COST_CENTER_QUERY);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                CostCenter costCenter = new CostCenter(set.getString("id"),
                                                       set.getString("Location"));
                costCenters.add(costCenter);
            }
            connection.closeConnection();
        } catch (SQLException e)
        {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Cost Centers Failed: " + e.getMessage());
            return CostCentersResponse.costCenterFailure(e.getMessage());
        }
        return new CostCentersResponse(costCenters);
    }
}
