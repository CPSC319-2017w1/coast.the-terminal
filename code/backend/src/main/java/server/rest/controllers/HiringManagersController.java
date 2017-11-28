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

    public ArrayList<HiringManager> getHiringManagers() throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HiringManager> hiringManagers = new ArrayList<HiringManager>();
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to open database connection");
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
        return hiringManagers;
    }

    public HiringManager addHiringManager(String firstName, String lastName) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        HiringManager manager = new HiringManager(id, firstName, lastName);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to open database connection");
        }
        PreparedStatement st = connection.getPreparedStatement(addQuery);
        int index = 1;
        st.setString(index++, manager.getId());
        st.setString(index++, manager.getFirstName());
        st.setString(index++, manager.getLastName());
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to add hiring manager");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return manager;
    }

    public HiringManager editHiringManager(String userID, String firstName, String lastName) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        HiringManager manager = new HiringManager(userID, firstName, lastName);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(editQuery);
        int index = 1;
        st.setString(index++, manager.getFirstName());
        st.setString(index++, manager.getLastName());
        st.setString(index++, manager.getId());
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to edit Hiring Manager");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return manager;
    }

    @RequestMapping("/hiringmanagers/view")
    public HiringManagersResponse hiringmanagers(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return HiringManagersResponse.hiringManagersFailure("User is not logged in");
        }
        ArrayList<HiringManager> hiringManagers;
        try {
            hiringManagers = this.getHiringManagers();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HiringManagers Failed: " + e.getMessage());
            return HiringManagersResponse.hiringManagersFailure(e.getMessage());
        }
        return new HiringManagersResponse(hiringManagers);
    }

    @RequestMapping("/hiringmanagers/add")
    public HiringManagerResponse addManager(@RequestParam("token") String token,
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName) {
        if (!isUserLoggedIn(token)) {
            return HiringManagerResponse.hiringManagerFailure("User is not logged in");
        }
        HiringManager manager;
        try {
            manager = this.addHiringManager(firstName, lastName);
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Hiring Manager failed: " + e.getMessage());
            return HiringManagerResponse.hiringManagerFailure(e.getMessage());
        }

        return new HiringManagerResponse(manager);
    }

    @RequestMapping("/hiringmanagers/edit")
    public HiringManagerResponse editManager(
            @RequestParam("token") String token,
        @RequestParam("id") String userID,
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName) {
        if (!isUserLoggedIn(token)) {
            return HiringManagerResponse.hiringManagerFailure("User is not logged in");
        }
        HiringManager manager;
        try {
            manager = this.editHiringManager(userID, firstName, lastName);
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit HiringManager Failed" + e.getMessage());
            return HiringManagerResponse.hiringManagerFailure(e.getMessage());
        }

        return new HiringManagerResponse(manager);
    }
}
