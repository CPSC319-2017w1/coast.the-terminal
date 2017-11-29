package server.externalapi;

import org.json.JSONArray;
import org.json.JSONObject;
import server.model.FXRate;
import server.rest.controllers.FXRateController;
import server.rest.responses.FXRatesResponse;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Currency Converter object for getting the FX rates from the Fixer api
 */
public class CurrencyConverter {

    /**
     * Gets the exchange rate between 2 given currencies
     * @param curID1 ID of the selling currency
     * @param curID2 ID of the buying currency
     * @param rate The current rate that is being used
     * @return The new FX rate
     */
    public static double getRate(String curID1, String curID2, double rate) {
        String urlString = "http://api.fixer.io/latest?base=" + curID1 + "&symbols=" + curID2;
        try {
            JSONObject object = JSONReader.readJSONFromURL(urlString);
            JSONObject rates = object.getJSONObject("rates");
            rate = rates.getDouble(curID2);
        } catch (Exception e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Failed to obtain rate: " + e.getMessage());
        }
        return rate;
    }

    /**
     * Function to update the rates for all the currencies in the database
     */
    public static void updateRates() {
        FXRateController controller = new FXRateController();
        ArrayList<FXRate> rates = new ArrayList<FXRate>();
        try {
             rates = controller.getRates();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to update rates: " + e.getMessage());
        }
        Logger.getAnonymousLogger().log(Level.INFO, "Updating Rates");
        for( int i = 0; i < rates.size(); ++i) {
            double rate = getRate(rates.get(i).getCur1ID(), rates.get(i).getCur2ID(), rates.get(i).getRate());
            FXRate newRate = new FXRate(rates.get(i).getCur1ID(), rates.get(i).getCur2ID(), rate);
            boolean status = controller.updateFXRates(newRate);
            if (!status) {
                Logger logger = Logger.getAnonymousLogger();
                logger.log(Level.INFO, "Failed tp get updated rate");
            }
        }
    }
}
