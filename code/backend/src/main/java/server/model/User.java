package server.model;

/**
 * Represents the User object
 */
public class User {

    private String username;
    private String password;
    private String permissions;

    /**
     * Creates a user object
     * @param username the supplied username
     * @param password the supplied password
     * @param permissions the permissions for this user
     */
    public User(String username, String password, String permissions) {
        this.username = username;
        this.password = password;
        this.permissions = permissions;
    }

    /**
     * Gets the permissions of this user
     * @return The permissions of the current User object
     */
    public String getPermissions() {
        return permissions;
    }

    /**
     * Gets the password of this user
     * @return The password of the current User object.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Gets the username of this user.
     * @return The username of the current User object
     */
    public String getUsername() {
        return username;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }
}
