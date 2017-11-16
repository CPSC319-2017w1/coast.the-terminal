package server.externalapi;

import org.json.JSONArray;
import org.json.JSONObject;
import server.model.FXRate;
import server.rest.controllers.FXRateController;
import server.rest.responses.FXRatesResponse;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by vaast on 14/11/2017.
 */
public class CurrencyConverter {

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

    public static void updateRates() {
        FXRateController controller = new FXRateController();
        FXRatesResponse response = controller.fxrates();
        ArrayList<FXRate> rates = response.getData();
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
