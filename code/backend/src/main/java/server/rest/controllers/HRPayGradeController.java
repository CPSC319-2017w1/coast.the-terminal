package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HRPayGrade;
import server.rest.responses.HRAddEditPayGradeResponse;
import server.rest.responses.HRPayGradeResponse;
import server.rest.responses.Response;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class HRPayGradeController extends Controller {
    private static String getQuery = "select * from HRPayGrade";
    private static String addQuery = "insert into HRPayGrade values(?, ?, ?, ?)";
    private static String editQuery = "update HRPayGrade set startAmount=?, endAmount=?, name=? where id=?";

    public ArrayList<HRPayGrade> getPayGrades() throws SQLException{
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HRPayGrade> payGrades = new ArrayList<HRPayGrade>();
        connection.openConnection();
        if(!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(getQuery);
        ResultSet set = st.executeQuery();
        while(set.next()) {
            HRPayGrade payGrade = new HRPayGrade(set.getString("id"),
                    set.getInt("startAmount"),
                    set.getInt("endAmount"),
                    set.getString("name"));
            payGrades.add(payGrade);
        }
        connection.closeConnection();
        return payGrades;
    }

    public HRPayGrade addPayGrade(int startAmt, int endAmt, String name) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        HRPayGrade payGrade = new HRPayGrade(id, startAmt, endAmt, name);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(addQuery);
        int index = 1;
        st.setString(index++, payGrade.getId());
        st.setInt(index++, payGrade.getStartAmount());
        st.setInt(index++, payGrade.getEndAmount());
        st.setString(index++, payGrade.getName());
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to add Pay Grade");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return payGrade;
    }

    public HRPayGrade editPayGrade(String id, int startAmt, int endAmt, String name) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        HRPayGrade payGrade = new HRPayGrade(id, startAmt, endAmt, name);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(editQuery);
        int index = 1;
        st.setInt(index++, payGrade.getStartAmount());
        st.setInt(index++, payGrade.getEndAmount());
        st.setString(index++, payGrade.getName());
        st.setString(index++, payGrade.getId());
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to edit Paygrade");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return payGrade;
    }

    @RequestMapping("/paygrades/view")
    public HRPayGradeResponse paygrades(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return HRPayGradeResponse.hrPayGradeFailure("User is not logged in");
        }
        ArrayList<HRPayGrade> payGrades;
        try {
            payGrades = this.getPayGrades();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HRPayGrades Failed: " + e.getMessage());
            return HRPayGradeResponse.hrPayGradeFailure(e.getMessage());
        }
        return new HRPayGradeResponse(payGrades);
    }

    @RequestMapping("/paygrades/add")
    public Response addPayGrade(
            @RequestParam("token") String token,
            @RequestParam("startAmount") int startAmt,
            @RequestParam("endAmount") int endAmt,
            @RequestParam("name") String name){
        if (!isUserLoggedIn(token)) {
            return HRAddEditPayGradeResponse.payGradeFailure("User is not logged in");
        }
        HRPayGrade payGrade;
        try {
            payGrade = this.addPayGrade(startAmt, endAmt, name);
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Paygrades failed" + e.getMessage());
            return HRAddEditPayGradeResponse.payGradeFailure(e.getMessage());
        }
        return new HRAddEditPayGradeResponse(payGrade);
    }

    @RequestMapping("/paygrades/edit")
    public HRAddEditPayGradeResponse editPayGrade(
            @RequestParam("token") String token,
            @RequestParam("id") String id,
            @RequestParam("startAmount") int startAmt,
            @RequestParam("endAmount") int endAmt,
            @RequestParam("name") String name){
        if (!isUserLoggedIn(token)) {
            return HRAddEditPayGradeResponse.payGradeFailure("User is not logged in");
        }
        HRPayGrade payGrade;
        try {
            payGrade = this.editPayGrade(id, startAmt, endAmt, name);
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit Paygrade failed" + e.getMessage());
            return HRAddEditPayGradeResponse.payGradeFailure(e.getMessage());
        }
        return new HRAddEditPayGradeResponse(payGrade);
    }
}
