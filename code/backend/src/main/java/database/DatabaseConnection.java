package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private Connection dbConnection;
    public DatabaseConnection(String url, String username, String password) {
        try {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            dbConnection = DriverManager.getConnection(
                    url,
                    username,
                    password);

        } catch (SQLException e) {
            System.out.println("Error in opening database connection: " + e.getMessage());
        }
    }


}
