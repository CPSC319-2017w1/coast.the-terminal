package server.model;

/**
 * Created by vaast on 31/10/2017.
 */
public class Contractor {
    private int id;
    private String firstName;
    private String lastName;
    private String agencySource;
    private String status;
    private boolean rehire;

    /**
     * Creates a Contractor Object
     * @param id Id of the contractor
     * @param firstName First Name of the Contractor
     * @param lastName Last Name of the Contractor
     * @param agencySource Agency Source of the Contractor
     * @param status Status of the Contractor
     * @param rehire Rehire status of the Contractor
     */
    public Contractor(int id, String firstName, String lastName, String agencySource, String status, boolean rehire) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.agencySource = agencySource;
        this.status = status;
        this.rehire = rehire;
    }

    /**
     * Gets the Id of the current contractor
     * @return The id of the contractor
     */
    public int getId() {
        return id;
    }

    /**
     * Gets the rehire status of the current contractor
     * @return The rehire status of the contractor
     */
    public boolean isRehire() {
        return rehire;
    }

    /**
     * Gets the Agency Source of the current contractor
     * @return The agency source of the contractor
     */
    public String getAgencySource() {
        return agencySource;
    }

    /**
     * Gets the first name of the current contractor
     * @return The first name of the contractor
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Gets the last name of the current contractor
     * @return The last name of the contractor
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * The status of the current contractor
     * @return The status of the contractor
     */
    public String getStatus() {
        return status;
    }
}
