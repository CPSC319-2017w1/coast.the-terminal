package server.rest.responses;

import server.model.HRPayGrade;

/**
 * Created by vaast on 13/11/2017.
 */
public class HRAddEditPayGradeResponse extends Response {

    HRPayGrade payGrade;

    public static HRAddEditPayGradeResponse payGradeFailure(String msg) {
        HRPayGrade payGrade = new HRPayGrade("", 0, 0, "");
        HRAddEditPayGradeResponse response = new HRAddEditPayGradeResponse(payGrade);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HRAddEditPayGradeResponse(HRPayGrade payGrade) {
        this.payGrade = payGrade;
    }

    public HRPayGrade getPayGrade() {
        return payGrade;
    }
}
