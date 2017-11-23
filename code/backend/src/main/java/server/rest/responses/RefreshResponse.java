package server.rest.responses;

/**
 * Created by vaast on 23/11/2017.
 */
public class RefreshResponse extends Response{

    public static RefreshResponse errorResponse(String msg) {
        RefreshResponse response = new RefreshResponse();
        response.setErrorMessage(msg);
        response.setError(true);
        return response;
    }
}
