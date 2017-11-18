package server.model;

/**
 * Created by vaast on 17/11/2017.
 */
public class Login {
    String username;
    String token;
    String timestamp;

    public Login(String username, String token, String timestamp) {
        this.timestamp = timestamp;
        this.username = username;
        this.token = token;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }
}
