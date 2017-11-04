package server.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
public class DatabaseConnection {
    private Connection dbConnection;
    private String url;
    private String username;
    private String password;
    private boolean connected;

    public DatabaseConnection(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.connected = false;
        this.dbConnection = null;
    }

    /**
     * Opens the database connection.
     * @note Sets the autocommit to false on successful connection
     */
    public void openConnection() throws SQLException {
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        this.dbConnection = DriverManager.getConnection(
                this.url,
                this.username,
                this.password);

        this.dbConnection.setAutoCommit(false);
        this.connected = true;

        Logger logger = Logger.getAnonymousLogger();
        logger.log(Level.INFO, "Database connection successful");

    }

    /**
     * Closes the Database connection to release the resources
     */
    public void closeConnection() throws SQLException {
        if(connected) {
            dbConnection.close();
        }
        Logger logger = Logger.getAnonymousLogger();
        logger.log(Level.INFO, "Closed connection successfully");
    }

    /**
     * Gets the current status of the database connection
     * @return The status of the database connection
     */
    public boolean isConnected() {
        return this.connected;
    }

    /**
     * Creates a prepared statement to be executed by the connection
     * @implNote Assumes that the database has been connected
     * @param query The query to be converted into a prepared statement
     * @return A prepared statement with the query string
     */
    public PreparedStatement getPreparedStatement(String query) throws SQLException {
        return dbConnection.prepareStatement(query);
    }

    /**
     * Commits a SQL transaction to the database (used for updates and inserts)
     * @throws SQLException If the transaction was unsuccessful.
     */
    public void commitTransaction() throws SQLException {
        dbConnection.commit();
    }

}
