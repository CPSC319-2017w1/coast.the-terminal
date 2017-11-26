package server.rest.responses;

/**
 * Created by vaast on 25/11/2017.
 */
public class LogoutResponse extends Response {

    public static LogoutResponse errorResponse(String msg) {
        LogoutResponse response = new LogoutResponse();
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }
}
