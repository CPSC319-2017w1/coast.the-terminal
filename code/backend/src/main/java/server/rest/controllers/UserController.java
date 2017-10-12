package server.rest.controllers;

import org.springframework.web.bind.annotation.RequestParam;
import server.database.DatabaseConnection;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.rest.responses.LoginResponse;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class UserController {
    //TODO move these to a configuration somewhere (possibly a spring bean)
    private static final String dbConnectionUrl = "jdbc:mysql://the-terminal-db-instance.c8lixxetvm6e.us-west-2.rds.amazonaws.com:3306/coast_capital_db";
    private static final String dbUsername = "Administrator";
    private static final String dbPassword = "TheTerminal!";
    @RequestMapping("/login")
    public LoginResponse login(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        try {
            DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);

            //TODO  do something with db connection to verify login credentials

            boolean success = true;
            String user = username;
            String permissions = "none";

            //NOTE Spring automatically converts all fields with getters into JSON for transmission
            return new LoginResponse(user, success, permissions);

        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.SEVERE, "Database connection failed: " + e.getMessage());
            LoginResponse response = new LoginResponse("", false, "none");
            response.setError(true);
            response.setErrorMessage("Failed to connect to database");
            return response;
        }
    }
}
