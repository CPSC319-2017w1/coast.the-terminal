package server.rest.controllers;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.HRPayGrade;
import server.model.HiringManager;
import server.rest.responses.HRPayGradeResponse;
import server.rest.responses.Response;

import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class HRPayGradeControllerTest {
    HRPayGradeController hrPayGradeController;
    @BeforeEach
    public void initController() {
        hrPayGradeController = new HRPayGradeController();
    }

    @Test
    void viewPayGradesTest(){
        ArrayList<HRPayGrade> payGrades = null;
        try {
            payGrades = hrPayGradeController.getPayGrades();
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        assertFalse(payGrades.isEmpty());
    }

    @Test
    void addPayGradeTest() {
        HRPayGrade payGrade = new HRPayGrade("newPayGrade", 0, 100, "name");
        try {
            HRPayGrade payGrade1 = hrPayGradeController.addPayGrade(payGrade.getStartAmount(), payGrade.getEndAmount(), payGrade.getName());
        } catch (SQLException e) {
            fail(e.getMessage());
        }
    }

}