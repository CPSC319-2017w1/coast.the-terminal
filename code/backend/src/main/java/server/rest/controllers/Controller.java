package server.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import server.database.DatabaseConnectionConfig;
import server.session.AuthenticationController;

/**
 * Base class Controller that contains common functionality for all other contractors
 */
public class Controller {
    protected static String dbConnectionUrl;
    protected static String dbUsername;
    protected static String dbPassword;

    /**
     * Sets the database specific params from the database config
     * @param dbConfig The Database connection config that contains the url, username and password
     */
    @Autowired
    public void setDbConfig(DatabaseConnectionConfig dbConfig) {
        dbConnectionUrl = dbConfig.getDbConnectionURL();
        dbUsername = dbConfig.getDbUsername();
        dbPassword = dbConfig.getDbPassword();
    }

    /**
     * Checks if the user accessing the API is logged in
     * @param token The unqiue token generated for a user when they logged in
     * @return true if the user is logged in.
     */
    protected static boolean isUserLoggedIn(String token) {
        return AuthenticationController.isLoggedInToken(token);
    }
}
