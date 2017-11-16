package server.rest.responses;

import server.model.HiringManager;

import java.util.ArrayList;

/**
 * Created by vaast on 06/11/2017.
 */
public class HiringManagersResponse extends Response {
    ArrayList<HiringManager> data;

    public static HiringManagersResponse hiringManagersFailure(String msg) {
        ArrayList<HiringManager> hiringManagers = new ArrayList<HiringManager>();
        HiringManagersResponse response = new HiringManagersResponse(hiringManagers);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HiringManagersResponse(ArrayList<HiringManager> hiringManagers) {
        this.data = hiringManagers;
    }

    public ArrayList<HiringManager> getData() {
        return data;
    }
}
