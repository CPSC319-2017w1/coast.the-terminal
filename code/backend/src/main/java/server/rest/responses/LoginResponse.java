package server.rest.responses;

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

    public LoginResponse(String username, boolean loginSuccessful, String permissions, String token) {
        this.username = username;
        this.loginSuccessful = loginSuccessful;
        this.permissions = permissions;
        this.token = token;
    }

    public boolean isLoginSuccessful() {
        return loginSuccessful;
    }

    public String getUsername() {
        return username;
    }

    public String getPermissions() {
        return permissions;
    }

    public String getToken() {
        return token;
    }
}
