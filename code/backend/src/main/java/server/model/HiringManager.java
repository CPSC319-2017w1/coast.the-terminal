package server.model;

/**
 * Created by vaast on 06/11/2017.
 */
public class HiringManager {
    String id;
    String firstName;
    String lastName;

    /**
     * Creates a userID object
     * @param id ID of the current user
     * @param firstName First Name of the current user
     * @param lastName Last Name of the current user
     */
    public HiringManager(String id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Gets the last name of the current user
     * @return the last name of the user
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Gets the first name of the current user
     * @return the first name of the user
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Gets the user ID of the current user
     * @return the user ID of the user
     */
    public String getId() {
        return id;
    }
}
