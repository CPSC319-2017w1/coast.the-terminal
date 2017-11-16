package server.rest.responses;

import server.model.HRPayGrade;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class HRPayGradeResponse extends Response {

    ArrayList<HRPayGrade> data;

    public static HRPayGradeResponse hrPayGradeFailure(String msg) {
        ArrayList<HRPayGrade> hrPayGrades = new ArrayList<HRPayGrade>();
        HRPayGradeResponse response = new HRPayGradeResponse(hrPayGrades);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public HRPayGradeResponse(ArrayList<HRPayGrade> payGrades) {
        this.data = payGrades;
    }

    public ArrayList<HRPayGrade> getData() {
        return data;
    }
}
