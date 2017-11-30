package server.rest.responses;

/**
 * Response object for REST API logout link
 */
public class LogoutResponse extends Response {

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static LogoutResponse errorResponse(String msg) {
        LogoutResponse response = new LogoutResponse();
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }
}
