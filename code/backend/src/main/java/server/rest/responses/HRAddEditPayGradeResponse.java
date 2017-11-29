package server.rest.responses;

import server.model.HRPayGrade;

/**
 * Response object for PayGrades' Add and Edit REST API links
 */
public class HRAddEditPayGradeResponse extends Response {

    HRPayGrade payGrade;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static HRAddEditPayGradeResponse payGradeFailure(String msg) {
        HRPayGrade payGrade = new HRPayGrade("", 0, 0, "");
        HRAddEditPayGradeResponse response = new HRAddEditPayGradeResponse(payGrade);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a HRAddEditPayGradeResponse object
     * @param payGrade The payGrade that is part of the response
     */
    public HRAddEditPayGradeResponse(HRPayGrade payGrade) {
        this.payGrade = payGrade;
    }

    /**
     * Gets the paygrade object
     * @return The Pay Grade object
     */
    public HRPayGrade getPayGrade() {
        return payGrade;
    }
}
