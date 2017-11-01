package server.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.database.DatabaseConnectionConfig;
import server.rest.responses.LoginResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class UserController {
    private DatabaseConnectionConfig dbConfig;
    private static final String loginQuery = "select * from User where username=? and password=?";

    @RequestMapping("/login")
    public LoginResponse login(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        DatabaseConnection connection = new DatabaseConnection(dbConfig.getDbConnectionURL(), dbConfig.getDbUsername(), dbConfig.getDbPassword());
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
            resultSet.next();
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

    @Autowired
    public void setDbConnectionConfig(DatabaseConnectionConfig dbConnectionUrl) {
        Logger.getAnonymousLogger().log(Level.INFO, "DB username = " + dbConnectionUrl.getDbUsername());
        this.dbConfig = dbConnectionUrl;
    }
}
