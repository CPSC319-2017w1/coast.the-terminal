package server.rest.responses;

import server.model.HRPayGrade;

import java.util.ArrayList;

/**
 * Response object for PayGrades' view link
 */
public class HRPayGradeResponse extends Response {

    ArrayList<HRPayGrade> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HRPayGradeResponse hrPayGradeFailure(String msg) {
        ArrayList<HRPayGrade> hrPayGrades = new ArrayList<HRPayGrade>();
        HRPayGradeResponse response = new HRPayGradeResponse(hrPayGrades);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a HRPayGrade Response object
     * @param payGrades The list of all pay grades that are part of the response
     */
    public HRPayGradeResponse(ArrayList<HRPayGrade> payGrades) {
        this.data = payGrades;
    }

    /**
     * Gets the list of HR Pay Grades
     * @return The list of HR PayGrades
     */
    public ArrayList<HRPayGrade> getData() {
        return data;
    }
}
