package server.model;

/**
 * Represents the pay grade of the object
 */
public class HRPayGrade {
    private String id;
    private int startAmount;
    private int endAmount;
    private String name;

    /**
     * Creates a user object
     * @param id the HR PayGrade ID
     * @param startAmt the start amount of the pay grade
     * @param endAmt the ending amount of the pay grade
     */
    public HRPayGrade(String id, int startAmt, int endAmt, String name) {
        this.id = id;
        this.startAmount = startAmt;
        this.endAmount = endAmt;
        this.name = name;
    }

    /**
     * Gets the id of the pay grade
     * @return The id of the HR PayGrade
     */
    public String getId() {
        return id;
    }

    /**
     * Gets the end amount for the pay grade
     * @return The end amount of the HR PayGrade
     */
    public int getEndAmount() {
        return endAmount;
    }

    /**
     * Gets the start amount for the pay grade
     * @return The start amount of the HR PayGrade
     */
    public int getStartAmount() {
        return startAmount;
    }

    /**
     * Gets the name of the Pay Grade
     * @return The name of the pay grade
     */
    public String getName() { return name; }
}
