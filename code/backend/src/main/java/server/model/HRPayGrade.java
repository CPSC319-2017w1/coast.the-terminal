package server.model;

/**
 * Created by vaast on 31/10/2017.
 */
public class HRPayGrade {
    private String id;
    private int startAmt;
    private int endAmt;

    /**
     * Creates a user object
     * @param id the HR PayGrade ID
     * @param startAmt the start amount of the pay grade
     * @param endAmt the ending amount of the pay grade
     */
    public HRPayGrade(String id, int startAmt, int endAmt) {
        this.id = id;
        this.startAmt = startAmt;
        this.endAmt = endAmt;
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
    public int getEndAmt() {
        return endAmt;
    }

    /**
     * Gets the start amount for the pay grade
     * @return The start amount of the HR PayGrade
     */
    public int getStartAmt() {
        return startAmt;
    }
}
