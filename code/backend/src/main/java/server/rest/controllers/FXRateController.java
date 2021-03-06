package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

/**
 * Controller for the FXRates table
 * Provides all the REST endpoints related to FXRates and stored SQL procedures
 */
@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class FXRateController extends Controller {
    private static final String fxrateQuery = "select * from FXRate";
    private static final String addQuery = "insert into FXRate values(?, ?, ?)";
    private static final String editQuery = "update FXRate set rate=? where curCode1=? and curCode2=?";

    /**
     * Get all the FXRates in the database
     * @return List of all FXRates
     * @throws SQLException if something went wrong whilst querying the database
     */
    public ArrayList<FXRate> getRates() throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<FXRate> fxRates = new ArrayList<FXRate>();
        connection.openConnection();
        if (!connection.isConnected())
        {
            return null;
        }
        PreparedStatement st = connection.getPreparedStatement(fxrateQuery);
        ResultSet set = st.executeQuery();
        while(set.next()) {
             FXRate fxRate = new FXRate(set.getString("curCode1"),
                    set.getString("curCode2"),
                    set.getDouble("rate"));
             fxRates.add(fxRate);
        }
        connection.closeConnection();
        return fxRates;
    }

    /**
     * REST API link for viewing all the FXRates
     * @param token The unique token of the User making the API call
     * @return Response containing all the FXRates or an error response
     */
    @RequestMapping("/fxrates/view")
    public FXRatesResponse fxrates(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return FXRatesResponse.fxRatesFailure("User is not logged in");
        }
            ArrayList<FXRate> rates;
        try {
            rates = this.getRates();
        } catch (SQLException e)
        {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get FxRates Failed: " + e.getMessage());
            return FXRatesResponse.fxRatesFailure(e.getMessage());
        }
        return new FXRatesResponse(rates);
    }

    /**
     * Updates a Exchange rate in the database
     * @param rate FXRate object that contains the source currency, dest currency and current rate
     * @return true if successful in making the update
     */
    public boolean updateFXRates(FXRate rate) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        boolean success = true;
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return false;
            }
            PreparedStatement st = connection.getPreparedStatement(editQuery);
            int index=1;
            st.setDouble(index++, rate.getRate());
            st.setString(index++, rate.getCur1ID());
            st.setString(index++, rate.getCur2ID());
            int status = st.executeUpdate();
            if (status == 0) {
                return false;
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Update FxRate failed: " + e.getMessage());
            success = false;
        }
        return success;
    }
}
