package server.rest.responses;

import server.model.FXRate;

import java.util.ArrayList;

/**
 * Response object for FXRates REST API link
 */
public class FXRatesResponse extends Response {

    private ArrayList<FXRate> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static FXRatesResponse fxRatesFailure(String msg) {
        ArrayList<FXRate> fxRates = new ArrayList<FXRate>();
        FXRatesResponse response = new FXRatesResponse(fxRates);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a FXRatesResponse object
     * @param fxRates List of FXRates part of the response
     */
    public FXRatesResponse(ArrayList<FXRate> fxRates) {
        this.data = fxRates;
    }

    /**
     * Gets the fx rates
     * @return List of FX Rates
     */
    public ArrayList<FXRate> getData() {
        return data;
    }
}
