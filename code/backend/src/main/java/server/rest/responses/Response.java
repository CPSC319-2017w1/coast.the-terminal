package server.rest.responses;

public class Response {
    private boolean error;
    private String errorMessage;

    public Response() {
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public static Response createErrorResponse(String errorMessage) {
        Response res = new Response();
        res.setErrorMessage(errorMessage);
        res.setError(true);
        return res;
    }
}
