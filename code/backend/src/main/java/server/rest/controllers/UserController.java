package server.rest.controllers;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.rest.responses.LoginResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class UserController {
    //TODO move these to a configuration somewhere (possibly a spring bean)
    private static final String dbConnectionUrl = "jdbc:mysql://the-terminal-db-instance.c8lixxetvm6e.us-west-2.rds.amazonaws.com:3306/coast_capital_db";
    private static final String dbUsername = "Administrator";
    private static final String dbPassword = "TheTerminal!";
    private static final String loginQuery = "select * from User where username=? and password=?";

    @RequestMapping("/login")
    public LoginResponse login(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        boolean success = true;
        String user = username;
        String permissions = "none";
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return LoginResponse.loginFailure("Failed to open database connection");
            }
            PreparedStatement st = connection.getPreparedStatement(loginQuery);
            st.setString(1, username);
            st.setString(2, password);
            ResultSet resultSet = st.executeQuery();
            if (!resultSet.isBeforeFirst()) {
                return LoginResponse.loginFailure("Incorrect username or password");
            }
            user = resultSet.getString("username");
            permissions = resultSet.getString("permissions");

            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Login failed: " + e.getMessage());
        }

        //NOTE Spring automatically converts all fields with getters into JSON for transmission
        return new LoginResponse(user, success, permissions);
    }
}
