package server.rest.responses;

import server.model.HRPayGrade;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class HRPayGradeResponse extends Response {

    ArrayList<HRPayGrade> payGrades;

    public static HRPayGradeResponse hrPayGradeFailure(String msg) {
        ArrayList<HRPayGrade> hrPayGrades = new ArrayList<HRPayGrade>();
        HRPayGradeResponse response = new HRPayGradeResponse(hrPayGrades);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HRPayGradeResponse(ArrayList<HRPayGrade> payGrades) {
        this.payGrades = payGrades;
    }
}
