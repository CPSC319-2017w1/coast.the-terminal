package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.Skill;
import server.rest.responses.SkillsAddResponse;
import server.rest.responses.SkillsEditResponse;
import server.rest.responses.SkillsResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class SkillsController extends Controller {
    private static String getQuery = "select * from Skill;";
    private static String insertQuery = "insert into Skill values(?, ?, ?, ?);";
    private static String updateQuery = "update Skill set name=?, description=?, type=? where id=?";

    @RequestMapping("/skills/view")
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

    @RequestMapping("/skills/add")
    public SkillsAddResponse addSkill(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") String type) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        int index = ThreadLocalRandom.current().nextInt(0, Integer.MAX_VALUE);
        Skill skill = new Skill(index, name, description, type);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return SkillsAddResponse.addSkillsFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(insertQuery);
            int i = 1;
            st.setInt(i++, skill.getId());
            st.setString(i++, skill.getName());
            st.setString(i++, skill.getDescription());
            st.setString(i++, skill.getType());
            int success = st.executeUpdate();
            connection.commitTransaction();
            if (success == 0) {
                SkillsAddResponse.addSkillsFailure("Failed to add skill");
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add skill failed: " + e.getMessage());
            return SkillsAddResponse.addSkillsFailure(e.getMessage());
        }
        return new SkillsAddResponse(skill);
    }

    @RequestMapping("/skills/edit")
    public SkillsEditResponse editSkill(
            @RequestParam("id") int id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") String type) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        Skill skill = new Skill(id, name, description, type);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return SkillsEditResponse.editSkillFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(updateQuery);
            int i = 1;
            st.setString(i++, skill.getName());
            st.setString(i++, skill.getDescription());
            st.setString(i++, skill.getType());
            st.setInt(i++, skill.getId());
            st.executeQuery();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit skill failed: " + e.getMessage());
            return SkillsEditResponse.editSkillFailure(e.getMessage());
        }
        return new SkillsEditResponse(skill);
    }
}
