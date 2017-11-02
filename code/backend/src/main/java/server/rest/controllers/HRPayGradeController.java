package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HRPayGrade;
import server.rest.responses.HRPayGradeResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class HRPayGradeController extends Controller {
    private static String getQuery = "select * from HRPayGrade;";

    @RequestMapping("/paygrades/view")
    public HRPayGradeResponse paygrades() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HRPayGrade> payGrades = new ArrayList<HRPayGrade>();
        try {
            connection.openConnection();
            if(!connection.isConnected()) {
                return HRPayGradeResponse.hrPayGradeFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                HRPayGrade payGrade = new HRPayGrade(set.getString("id"),
                                                     set.getInt("startAmount"),
                                                     set.getInt("endAmount"));
                payGrades.add(payGrade);
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HRPayGrades Failed: " + e.getMessage());
            return HRPayGradeResponse.hrPayGradeFailure(e.getMessage());
        }
        return new HRPayGradeResponse(payGrades);
    }
}
