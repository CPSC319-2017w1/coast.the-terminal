package server.rest.responses;

/**
 * Base response object
 */
public class Response {
    private boolean error;
    private String errorMessage;

    /**
     * Creates a new Respone object
     */
    public Response() {
    }

    /**
     * Returns if the response is an error
     * @return true if the response is an error
     */
    public boolean isError() {
        return error;
    }

    /**
     * Sets the error of the response
     * @param error Error state of the response
     */
    public void setError(boolean error) {
        this.error = error;
    }

    /**
     * Gets the error message
     * @return The error message of the response
     */
    public String getErrorMessage() {
        return errorMessage;
    }

    /**
     * Sets the error message
     * @param errorMessage the error message
     */
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    /**
     * Creates an error response
     * @param errorMessage error message
     * @return An error response
     */
    public static Response createErrorResponse(String errorMessage) {
        Response res = new Response();
        res.setErrorMessage(errorMessage);
        res.setError(true);
        return res;
    }
}
