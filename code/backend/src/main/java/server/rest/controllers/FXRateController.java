package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.FXRate;
import server.rest.responses.FXRatesResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class FXRateController extends Controller {
    private static final String fxrateQuery = "select * from FXRate;";

    @RequestMapping("/fxrates")
    public FXRatesResponse fxrates() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<FXRate> fxRates = new ArrayList<FXRate>();
        try {
            connection.openConnection();
            if (!connection.isConnected())
            {
                return FXRatesResponse.fxRatesFailure("Failed to connect to the database");
            }
            PreparedStatement st = connection.getPreparedStatement(fxrateQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                FXRate fxRate = new FXRate(set.getString("curCode1"),
                                           set.getString("curCode2"),
                                           set.getDouble("rate"));
                fxRates.add(fxRate);
            }
        } catch (SQLException e)
        {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get FxRates Failed: " + e.getMessage());
            return FXRatesResponse.fxRatesFailure(e.getMessage());
        }
        return new FXRatesResponse(fxRates);
    }
}
