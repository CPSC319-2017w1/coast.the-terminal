package server.model;

/**
 * Created by vaast on 30/10/2017.
 */
public class FXRate {
    private String cur1ID;
    private String cur2ID;
    private double rate;

    /**
     * Creates an exchange rate object
     * @param id1 the ID of the first currency
     * @param id2 the ID of the second currency
     * @param rate the exchange rate between the 2 currencies
     */
    public FXRate(String id1, String id2, double rate) {
        this.cur1ID = id1;
        this.cur2ID = id2;
        this.rate = rate;
    }

    /**
     * Gets the id of the first currency
     * @return The ID of the first currency
     */
    public String getCur1ID() {
        return this.cur1ID;
    }

    /**
     * Gets the id of the second currency
     * @return The ID of the second currency
     */
    public String getCur2ID() {
        return this.cur2ID;
    }

    /**
     * Gets the exchange rate between the two currencies
     * @return The exchange rate between the two currencies
     */
    public double getRate() {
        return this.rate;
    }
}
