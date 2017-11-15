package server.externalapi;

import server.model.FXRate;
import server.rest.controllers.FXRateController;
import server.rest.responses.FXRatesResponse;

import java.util.ArrayList;

/**
 * Created by vaast on 14/11/2017.
 */
public class CurrencyConverter {

    public double getRate(String curID1, String curID2) {
        double rate = 0.0;

        return rate;
    }

    public void updateRates() {
        FXRateController controller = new FXRateController();
        FXRatesResponse response = controller.fxrates();
        ArrayList<FXRate> rates = response.getRates();
        for( int i = 0; i < rates.size(); ++i) {
// Use http://api.fixer.io/latest?base=CAD&symbols=USD
        }
    }
}
