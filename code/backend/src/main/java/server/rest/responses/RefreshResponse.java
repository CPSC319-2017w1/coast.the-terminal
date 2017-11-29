package server.rest.responses;

/**
 * Response object for the REST API Refresh link
 */
public class RefreshResponse extends Response{

    String permissions;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static RefreshResponse errorResponse(String msg) {
        RefreshResponse response = new RefreshResponse("");
        response.setErrorMessage(msg);
        response.setError(true);
        return response;
    }

    /**
     * Creates a RefreshResponse object
     * @param permissions Permissions of the user who initiated the refresh
     */
    public RefreshResponse(String permissions) {
        this.permissions = permissions;
    }

    /**
     * Gets the permissions of the user
     * @return Permissions of the user
     */
    public String getPermissions() {
        return this.permissions;
    }
}
