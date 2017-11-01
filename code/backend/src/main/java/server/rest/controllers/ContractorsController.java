package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.Contractor;
import server.rest.responses.ContractorsResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class ContractorsController extends Controller {
    private static String getQuery = "select * from Contractor;";

    @RequestMapping("/contractors")
    public ContractorsResponse contractors() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<Contractor> contractors = new ArrayList<Contractor>();

        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return ContractorsResponse.contractorsFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                Contractor c = new Contractor(set.getInt("id"),
                                              set.getString("firstName"),
                                              set.getString("surname"),
                                              set.getString("agencySource"),
                                              set.getString("status"),
                                              set.getBoolean("rehire"));
                contractors.add(c);
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Contractors Failed: " + e.getMessage());
            return ContractorsResponse.contractorsFailure(e.getMessage());
        }

        return new ContractorsResponse(contractors);
    }

}
