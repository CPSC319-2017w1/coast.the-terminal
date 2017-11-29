package server.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Represents the login object in the login table
 */
public class Login {
    String username;
    String token;
    String timestamp;

    /**
     * Creates a login object
     * @param username The username of the user that logged in
     * @param token The generated token for the user that logged in
     * @param timestamp The timestamp of the last access
     */
    public Login(String username, String token, String timestamp) {
        this.timestamp = timestamp;
        this.username = username;
        this.token = token;
    }

    /**
     * Gets the timestamp of the last access for the logged in user
     * @return The timestamp of the last access for the logged in user
     */
    public String getTimestamp() {
        return timestamp;
    }

    /**
     * Gets the token for the login that is used by the frontend
     * @return The token for the login
     */
    public String getToken() {
        return token;
    }

    /**
     * Gets the username of the user who logged in
     * @return The username of the user who logged in
     */
    public String getUsername() {
        return username;
    }

    /**
     * Checks if the login of a user has expired
     * @param maxDuration The max amount of time that is allowed for a user to be idle
     * @return true if the login of a user has expired
     */
    public boolean isExpired(long maxDuration) {
        boolean result = false;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date d = sdf.parse(this.timestamp);
            Date d2 = new Date();
            if ((d2.getTime() - d.getTime()) >= maxDuration) {
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }
}
