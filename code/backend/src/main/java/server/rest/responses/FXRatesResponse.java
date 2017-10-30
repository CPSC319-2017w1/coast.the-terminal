package server.rest.responses;

import server.model.FXRate;

import java.util.ArrayList;

/**
 * Created by vaast on 30/10/2017.
 */
public class FXRatesResponse extends Response {

    private ArrayList<FXRate> rates;

    public static FXRatesResponse fxRatesFailure(String msg) {
        ArrayList<FXRate> fxRates = new ArrayList<FXRate>();
        FXRatesResponse response = new FXRatesResponse(fxRates);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public FXRatesResponse(ArrayList<FXRate> fxRates) {
        this.rates = fxRates;
    }
}
