package server.database;

import org.junit.jupiter.api.Test;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.fail;

class DatabaseConnectionTest {
    private static final String dbConnectionUrl = "jdbc:mysql://the-terminal-db-instance.c8lixxetvm6e.us-west-2.rds.amazonaws.com:3306/coast_capital_db";
    private static final String dbUsername = "Administrator";
    private static final String dbPassword = "TheTerminal!";
    @Test
    void databaseConnection(){
        try {
            DatabaseConnection dbConnection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
            dbConnection.openConnection();
        } catch(SQLException e) {
            fail("Db connection failed: " + e.getMessage());
        }
    }
}