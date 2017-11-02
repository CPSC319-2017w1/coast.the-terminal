package server.model;

/**
 * Created by vaast on 31/10/2017.
 */
public class HRPositionRole {
    private String id;
    private String roleName;
    private String description;

    /**
     * Creates a HRPositionRole object
     * @param id Id of the HRPositionRole
     * @param roleName Name of the HRPositionRole
     * @param description Description of the HRPositionRole
     */
    public HRPositionRole(String id, String roleName, String description) {
        this.id = id;
        this.roleName = roleName;
        this.description = description;
    }

    /**
     * Gets the id of the HRPositionRole
     * @return The id of the HRPositionRole
     */
    public String getId() {
        return id;
    }

    /**
     * Gets the role name of the HRPositionRole
     * @return The roleName of the HRPositionRole
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * Gets the description of the HRPositionRole
     * @return The description of the HRPositionRole
     */
    public String getDescription() {
        return description;
    }
}
