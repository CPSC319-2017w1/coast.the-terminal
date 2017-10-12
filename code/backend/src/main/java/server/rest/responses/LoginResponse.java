package server.rest.responses;

public class LoginResponse extends Response {
    private boolean loginSuccessful;
    private String username;
    private String permissions;

    public LoginResponse(String username, boolean loginSuccessful, String permissions) {
        this.username = username;
        this.loginSuccessful = loginSuccessful;
        this.permissions = permissions;
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
}
