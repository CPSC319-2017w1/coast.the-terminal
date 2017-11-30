package server.rest.responses;

import server.model.HiringManager;

/**
 * Response object for Hiring Manager Add and Edit REST API links
 */
public class HiringManagerResponse extends Response {
    HiringManager hiringManager;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HiringManagerResponse hiringManagerFailure(String msg) {
        HiringManager hm = new HiringManager("", "", "");
        HiringManagerResponse response = new HiringManagerResponse(hm);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a Hiring manager Response
     * @param hm Hiring Manager part of the response
     */
    public HiringManagerResponse(HiringManager hm) {
        this.hiringManager = hm;
    }

    /**
     * Gets the hiring manager
     * @return The hiring manager part of the response
     */
    public HiringManager getHiringManager() {
        return hiringManager;
    }
}
