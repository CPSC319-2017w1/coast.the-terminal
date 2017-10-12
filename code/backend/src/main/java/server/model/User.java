package server.model;

//TODO add stuff to this class, have it implement the IUser interface we define
public class User {
    //maybe can change this to String?
    private int id;
    private String username;
    private String password;

    /**
     * Creates a user object
     * @param id the user ID
     * @param username the supplied username
     * @param password the supplied password
     */
    public User(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    /**
     * Gets the user id of this user
     * @return The user id of the current User object
     */
    public int getId() {
        return id;
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
}
