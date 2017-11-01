package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.Skill;
import server.rest.responses.SkillsResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:1234")
@RestController
public class SkillsController extends Controller {
    private static String getQuery = "select * from Skill;";

    @RequestMapping("/skills")
    public SkillsResponse skills() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<Skill> skills = new ArrayList<Skill>();
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return SkillsResponse.skillsFailure("Failed to open Database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                Skill s = new Skill(set.getInt("id"),
                                    set.getString("name"),
                                    set.getString("description"),
                                    set.getString("type"));
                skills.add(s);
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Skills Failed: " + e.getMessage());
            return SkillsResponse.skillsFailure(e.getMessage());
        }

        return new SkillsResponse(skills);
    }
}
