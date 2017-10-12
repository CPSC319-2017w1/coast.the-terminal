package server.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
public class DatabaseConnection {
    private Connection dbConnection;
    public DatabaseConnection(String url, String username, String password) throws SQLException {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            this.dbConnection = DriverManager.getConnection(
                    url,
                    username,
                    password);

            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Database connection successful");
    }


}
