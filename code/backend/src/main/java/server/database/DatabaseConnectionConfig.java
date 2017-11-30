package server.database;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Configuration Object that parses and stores the database url, username and password
 */
@Component
public class DatabaseConnectionConfig {
    private static final String DB_CONNECTION_URL_PREFIX = "jdbc:mysql://";
    private static final String PORT_SEPARATOR = ":";
    private static final String DB_NAME_SEPARATOR = "/";
    @Value("${RDS_HOSTNAME}")
    private String dbHostName;
    @Value("${RDS_PORT}")
    private String dbPort;
    @Value("${RDS_DB_NAME}")
    private String dbName;
    @Value("${RDS_USERNAME}")
    private String dbUsername;
    @Value("${RDS_PASSWORD}")
    private String dbPassword;

    public String getDbConnectionURL() {
        return DB_CONNECTION_URL_PREFIX +
                dbHostName +
                PORT_SEPARATOR +
                dbPort +
                DB_NAME_SEPARATOR +
                dbName;
    }

    public String getDbPassword() {
        return dbPassword;
    }

    public String getDbUsername(){
        return dbUsername;
    }
}
