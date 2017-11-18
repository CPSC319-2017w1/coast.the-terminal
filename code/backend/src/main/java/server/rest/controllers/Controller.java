package server.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import server.database.DatabaseConnectionConfig;
import server.session.AuthenticationController;

/**
 * Created by vaast on 30/10/2017.
 */
public class Controller {
    protected static String dbConnectionUrl;
    protected static String dbUsername;
    protected static String dbPassword;

    @Autowired
    public void setDbConfig(DatabaseConnectionConfig dbConfig) {
        dbConnectionUrl = dbConfig.getDbConnectionURL();
        dbUsername = dbConfig.getDbUsername();
        dbPassword = dbConfig.getDbPassword();
    }

    protected static boolean isUserLoggedIn(String token) {
        return AuthenticationController.isUserLoggedIn(token);
    }
}
