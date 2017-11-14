package server.rest.responses;

import server.model.HiringManager;

/**
 * Created by vaast on 13/11/2017.
 */
public class HiringManagerResponse extends Response {
    HiringManager hiringManager;

    public static HiringManagerResponse hiringManagerFailure(String msg) {
        HiringManager hm = new HiringManager("", "", "");
        HiringManagerResponse response = new HiringManagerResponse(hm);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HiringManagerResponse(HiringManager hm) {
        this.hiringManager = hm;
    }

    public HiringManager getHiringManager() {
        return hiringManager;
    }
}
