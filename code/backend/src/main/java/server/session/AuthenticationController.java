package server.session;

import org.springframework.web.bind.annotation.*;
import server.database.DatabaseConnection;
import server.model.Login;
import server.rest.controllers.Controller;
import server.rest.responses.LogoutResponse;
import server.rest.responses.RefreshResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Controller for the Authentication related tables
 * Provides all the REST endpoints related to Authentication and stored SQL procedures
 */
@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"}, methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
public class AuthenticationController extends Controller{
    private static final String insertQuery = "insert into Login values(?, ?, ?)";
    private static final String deleteQuery = "delete from Login where username=?";
    private static final String getAllLogins = "select * from Login";
    private static final String getQuery = "select * from Login where username=?";
    private static final String getTokenQuery = "select * from Login where token=?";
    private static final String updateQuery = "update Login set timestamp=? where token=?";
    private static final String refreshQuery = "select * from Login where token=? and username=?";
    private static final String permissionsQuery = "select * from User where username=?";

    /**
     * Gets the current date and time in a String
     * @return The current date and time in a String
     */
    public static String getCurrentDateTime() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = sdf.format(date);
        return currentTime;
    }

    /**
     * REST API link to refresh
     * @param username Username to refresh login for
     * @param token Unique token of the user
     * @return Response containing the User data or an error response
     */
    @RequestMapping("/refresh")
    public RefreshResponse refresh(
            @RequestParam("username") String username,
            @RequestParam("token") String token) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String permissions = "";
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return RefreshResponse.errorResponse("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(refreshQuery);
            st.setString(1, token);
            st.setString(2, username);
            ResultSet set = st.executeQuery();
            if (!set.next()) {
                return RefreshResponse.errorResponse("Failed to find token");
            }
            st = connection.getPreparedStatement(permissionsQuery);
            st.setString(1, username);
            set = st.executeQuery();
            if (set.next()) {
                permissions = set.getString("permissions");
                updateTimeStamp(token);
            } else {
                return RefreshResponse.errorResponse("Invalid User");
            }
            connection.closeConnection();
        } catch (SQLException e) {
            return RefreshResponse.errorResponse(e.getMessage());
        }
        return new RefreshResponse(permissions);
    }

    /**
     * REST API link to logout
     * @param username The username of the user who is logging out
     * @param token The qunique token of the user
     * @return Response stating whether logout was successful or not
     */
    @RequestMapping("/logout")
    public LogoutResponse logout(@RequestParam("username") String username, @RequestParam("token") String token) {
        if (!logout(username)) {
            return LogoutResponse.errorResponse("Failed to logout");
        }
        return new LogoutResponse();
    }

    /**
     * Checks if a user is logged in or not given their unique token
     * @param token The unique token of the user
     * @return true if user is logged in
     */
    public static boolean isLoggedInToken(String token) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        boolean result = true;
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getTokenQuery);
            st.setString(1, token);
            ResultSet set = st.executeQuery();
            if (!set.next()) {
                result = false;
            }
            connection.closeConnection();
        } catch (SQLException e){
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to check if user is logged in: " + e.getMessage());
            result = false;
        }
        return result;
    }

    /**
     * Updates the last access time stamp for a user in the database
     * @param token The unique token of the user
     */
    public static void updateTimeStamp(String token) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(updateQuery);
            st.setString(1, getCurrentDateTime());
            st.setString(2, token);
            connection.closeConnection();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to update timestamp: " + e.getMessage());
        }
    }

    /**
     * Checks if a user is logged in given the username
     * @param username The username of the User
     * @return true if the user is logged in
     */
    public static boolean isLoggedIn(String username) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        boolean result = true;
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            st.setString(1, username);
            ResultSet set = st.executeQuery();
            if (!set.next()) {
                result = false;
            }
            connection.closeConnection();
        } catch (SQLException e){
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to check if user is logged in: " + e.getMessage());
            result = false;
        }
        return result;
    }

    /**
     * Gets the unique token of the username
     * @param username The username of the User
     * @return The unique token of the User
     */
    public static String getToken(String username) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String result = "";
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            st.setString(1, username);
            ResultSet set = st.executeQuery();
            if (set.next()) {
                result = set.getString("token");
            }
            else {
                result = "";
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to get token: " + e.getMessage());
        }
        return result;
    }

    /**
     * Generates a unique token and logs the user in if it is a registered user
     * @param username Username of the user to login
     * @return The unique generated token.
     */
    public static String login(String username) {
        if (isLoggedIn(username)) {
            String token = getToken(username);
            updateTimeStamp(token);
            return token;
        }
        String token = UUID.randomUUID().toString();
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
                return "";
            }
            PreparedStatement st = connection.getPreparedStatement(insertQuery);
            int index = 1;
            st.setString(index++, username);
            st.setString(index++, token);
            st.setString(index++, getCurrentDateTime());
            int success = st.executeUpdate();
            if (success == 0) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to update login");
                return "";
            } else {
                connection.commitTransaction();
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to update login: " + e.getMessage());
            return "";
        }
        return token;
    }

    /**
     * Logs a user out of the system
     * @param username The username of the user
     * @return true if the user was successfully logged out
     */
    public static boolean logout(String username) {
        boolean flag = true;
        if (isLoggedIn(username)) {
            DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
            try {
                connection.openConnection();
                if (!connection.isConnected()) {
                    Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
                    flag = false;
                }
                PreparedStatement st = connection.getPreparedStatement(deleteQuery);
                st.setString(1, username);
                int success = st.executeUpdate();
                if (success == 0) {
                    Logger.getAnonymousLogger().log(Level.INFO, "Failed to logout");
                    flag = false;
                }
                connection.commitTransaction();
                connection.closeConnection();
            } catch(SQLException e) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to logout: " + e.getMessage());
                flag = false;
            }
        }
        return flag;
    }

    /**
     * Get all the users that are logged in
     * @return The list of all logged in users
     */
    public static ArrayList<Login> getLogins() {
        ArrayList<Login> logins = new ArrayList<Login>();
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getAllLogins);
            ResultSet set = st.executeQuery();
            while (set.next()) {
                Login login = new Login(set.getString("username"), set.getString("token"), set.getString("timestamp"));
                logins.add(login);
            }
            connection.closeConnection();
        } catch(SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to get all logins: " + e.getMessage());
        }
        return logins;
    }
}
