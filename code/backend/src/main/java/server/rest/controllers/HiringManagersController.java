package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.HiringManager;
import server.rest.responses.HiringManagersResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class HiringManagersController extends Controller{
    private static String getQuery = "select * from HiringManager;";

    @RequestMapping("/hiringmanagers/view")
    public HiringManagersResponse hiringmanagers() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<HiringManager> hiringManagers = new ArrayList<HiringManager>();
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return HiringManagersResponse.hiringManagersFailure("Failed to open database connection");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while (set.next()) {
                HiringManager hm = new HiringManager(set.getString("userId"),
                                                     set.getString("firstName"),
                                                     set.getString("lastName"));
                hiringManagers.add(hm);
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get HiringManagers Failed: " + e.getMessage());
            return HiringManagersResponse.hiringManagersFailure(e.getMessage());
        }
        return new HiringManagersResponse(hiringManagers);
    }
}
