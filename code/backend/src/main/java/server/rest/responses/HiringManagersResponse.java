package server.rest.responses;

import server.model.HiringManager;

import java.util.ArrayList;

/**
 * Response object for HiringManagers REST API view link
 */
public class HiringManagersResponse extends Response {
    ArrayList<HiringManager> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HiringManagersResponse hiringManagersFailure(String msg) {
        ArrayList<HiringManager> hiringManagers = new ArrayList<HiringManager>();
        HiringManagersResponse response = new HiringManagersResponse(hiringManagers);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a Hiring Managers Response object
     * @param hiringManagers List of Hiring Managers to be part of the response
     */
    public HiringManagersResponse(ArrayList<HiringManager> hiringManagers) {
        this.data = hiringManagers;
    }

    /**
     * Gets all the hiring managers
     * @return List of hiring managers
     */
    public ArrayList<HiringManager> getData() {
        return data;
    }
}
