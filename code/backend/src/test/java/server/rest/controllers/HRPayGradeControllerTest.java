package server.rest.controllers;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.HRPayGrade;
import server.rest.responses.HRPayGradeResponse;
import server.rest.responses.Response;

import static org.junit.jupiter.api.Assertions.*;

class HRPayGradeControllerTest {
    HRPayGradeController hrPayGradeController;
    @BeforeEach
    public void initController() {
        hrPayGradeController = new HRPayGradeController();
    }

    @Test
    void viewPayGradesTest(){
        HRPayGradeResponse response = hrPayGradeController.paygrades();
        assertFalse(response.getPayGrades().isEmpty());
    }

    @Test
    void addPayGradeTest() {
        HRPayGrade payGrade = new HRPayGrade("newPayGrade", 0, 100);
        Response response = hrPayGradeController.addPayGrade(payGrade.getId(), payGrade.getStartAmount(), payGrade.getEndAmount());
        assertFalse(response.isError());
    }

}