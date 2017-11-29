package server.rest.responses;

/**
 * Response object for the Login link
 */
public class LoginResponse extends Response {
    private boolean loginSuccessful;
    private String username;
    private String permissions;
    private String token;

    /**
     * Creates a failed login response object
     * @param msg Error Message citing reason for login failure
     * @return A failed login response object
     */
    public static LoginResponse loginFailure(String msg) {
        LoginResponse response = new LoginResponse("", false, "none", "");
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a login object
     * @param username
     * @param loginSuccessful
     * @param permissions
     * @param token
     */
    public LoginResponse(String username, boolean loginSuccessful, String permissions, String token) {
        this.username = username;
        this.loginSuccessful = loginSuccessful;
        this.permissions = permissions;
        this.token = token;
    }

    /**
     * Checks if the login was successful
     * @return true on successful login
     */
    public boolean isLoginSuccessful() {
        return loginSuccessful;
    }

    /**
     * Gets the username of the logged in user
     * @return The username of the logged in user
     */
    public String getUsername() {
        return username;
    }

    /**
     * Gets the permissions of the logged in user
     * @return The permissions of the logged in user
     */
    public String getPermissions() {
        return permissions;
    }

    /**
     * Gets the token of the logged in user
     * @return The token of the logged in user
     */
    public String getToken() {
        return token;
    }
}
