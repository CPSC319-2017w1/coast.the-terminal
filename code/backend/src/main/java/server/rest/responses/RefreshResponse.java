package server.rest.responses;

/**
 * Created by vaast on 23/11/2017.
 */
public class RefreshResponse extends Response{

    String permissions;

    public static RefreshResponse errorResponse(String msg) {
        RefreshResponse response = new RefreshResponse("");
        response.setErrorMessage(msg);
        response.setError(true);
        return response;
    }

    public RefreshResponse(String permissions) {
        this.permissions = permissions;
    }

    public String getPermissions() {
        return this.permissions;
    }
}
