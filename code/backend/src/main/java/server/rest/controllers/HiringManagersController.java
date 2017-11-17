package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HiringManager;
import server.rest.responses.HiringManagerResponse;
import server.rest.responses.HiringManagersResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class HiringManagersController extends Controller{
    private static String getQuery = "select * from HiringManager";
    private static String addQuery = "insert into HiringManager values(?, ?, ?)";
    private static String editQuery = "update HiringManager set firstName=?, lastName=? where userId=?";

    @RequestMapping("/hiringmanagers/view")
    public HiringManagersResponse hiringmanagers() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HiringManager> hiringManagers = new ArrayList<HiringManager>();
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return HiringManagersResponse.hiringManagersFailure("Failed to open database connection");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while (set.next()) {
                HiringManager hm = new HiringManager(set.getString("userId"),
                                                     set.getString("firstName"),
                                                     set.getString("lastName"));
                hiringManagers.add(hm);
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HiringManagers Failed: " + e.getMessage());
            return HiringManagersResponse.hiringManagersFailure(e.getMessage());
        }
        return new HiringManagersResponse(hiringManagers);
    }

    @RequestMapping("/hiringmanagers/add")
    public HiringManagerResponse addManager(
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        HiringManager manager = new HiringManager(id, firstName, lastName);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return HiringManagerResponse.hiringManagerFailure("Failed to open database connection");
            }
            PreparedStatement st = connection.getPreparedStatement(addQuery);
            int index = 1;
            st.setString(index++, manager.getId());
            st.setString(index++, manager.getFirstName());
            st.setString(index++, manager.getLastName());
            int success = st.executeUpdate();
            if (success == 0) {
                return HiringManagerResponse.hiringManagerFailure("Failed to add hiring manager");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Hiring Manager failed: " + e.getMessage());
            return HiringManagerResponse.hiringManagerFailure(e.getMessage());
        }

        return new HiringManagerResponse(manager);
    }

    @RequestMapping("/hiringmanagers/edit")
    public HiringManagerResponse editManager(
        @RequestParam("userId") String userID,
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        HiringManager manager = new HiringManager(userID, firstName, lastName);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return HiringManagerResponse.hiringManagerFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(editQuery);
            int index = 1;
            st.setString(index++, manager.getFirstName());
            st.setString(index++, manager.getLastName());
            st.setString(index++, manager.getId());
            int success = st.executeUpdate();
            if (success == 0) {
                return HiringManagerResponse.hiringManagerFailure("Failed to edit Hiring Manager");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit HiringManager Failed" + e.getMessage());
            return HiringManagerResponse.hiringManagerFailure(e.getMessage());
        }

        return new HiringManagerResponse(manager);
    }
}
