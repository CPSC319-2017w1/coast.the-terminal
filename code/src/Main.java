import java.sql.*;
/**
 * Created by vaastav on 10/10/2017.
 */
public class Main {
    public static void main(String args[])
    {
        try {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            String url = "jdbc:mysql://the-terminal-db-instance.c8lixxetvm6e.us-west-2.rds.amazonaws.com:3306/coast_capital_db";
            Connection con = DriverManager.getConnection(
                        url,
                    "Administrator",
                    "TheTerminal!");
            System.out.println("Didn't throw an issue");
        } catch (SQLException e){
            e.printStackTrace();
        }
    }
}
