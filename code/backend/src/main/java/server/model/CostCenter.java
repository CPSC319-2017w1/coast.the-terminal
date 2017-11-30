package server.model;

/**
 * Represents a Cost Center object
 */
public class CostCenter {
    private String id;
    private String location;

    /**
     * Creates a cost center object
     * @param id The id of the cost center in the database
     * @param location The location of the cost center in the database
     */
    public CostCenter(String id, String location) {
        this.id = id;
        this.location = location;
    }

    /**
     * Gets the id of the cost center
     * @return The id of the cost center
     */
    public String getId() {
        return id;
    }

    /**
     * Gets the location of the cost center
     * @return The location of the cost center
     */
    public String getLocation() {
        return location;
    }
}
