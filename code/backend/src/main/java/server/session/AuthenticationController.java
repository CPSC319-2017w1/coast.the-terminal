package server.session;

import server.database.DatabaseConnection;
import server.model.Login;
import server.rest.controllers.Controller;

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
 * Created by vaast on 17/11/2017.
 */
public class AuthenticationController extends Controller{
    private static final String insertQuery = "insert into Login values(?, ?, ?)";
    private static final String deleteQuery = "delete from Login where username=?";
    private static final String getAllLogins = "select * from Login";
    private static final String getQuery = "select * from Login where username=?";
    private static final String getTokenQuery = "select * from Login where token=?";
    private static final String updateQuery = "update Login set timestamp=? where token=?";

    public static String getCurrentDateTime() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = sdf.format(date);
        return currentTime;
    }

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
            }
            PreparedStatement st = connection.getPreparedStatement(insertQuery);
            int index = 1;
            st.setString(index++, username);
            st.setString(index++, token);
            st.setString(index++, getCurrentDateTime());
            int success = st.executeUpdate();
            if (success == 0) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to update login");
            } else {
                connection.commitTransaction();
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, "Failed to update login: " + e.getMessage());
        }
        return token;
    }

    public static boolean logout(String username) {
        if (isLoggedIn(username)) {
            DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
            try {
                connection.openConnection();
                if (!connection.isConnected()) {
                    Logger.getAnonymousLogger().log(Level.INFO, "Failed to connect to database");
                }
                PreparedStatement st = connection.getPreparedStatement(deleteQuery);
                st.setString(1, username);
                int success = st.executeUpdate();
                if (success == 0) {
                    Logger.getAnonymousLogger().log(Level.INFO, "Failed to logout");
                }
                connection.commitTransaction();
                connection.closeConnection();
            } catch(SQLException e) {
                Logger.getAnonymousLogger().log(Level.INFO, "Failed to logout: " + e.getMessage());
            }
        }
        return false;
    }

    public List<Login> getLogins() {
        List<Login> logins = new ArrayList<Login>();
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
