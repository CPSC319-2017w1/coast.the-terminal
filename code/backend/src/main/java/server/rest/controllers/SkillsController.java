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

/**
 * Controller for the Skills table in the database
 * Provides all the REST endpoints related to Skills and stored SQL procedures
 */
@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class SkillsController extends Controller {
    private static String getQuery = "select * from Skill";
    private static String insertQuery = "insert into Skill values(?, ?, ?, ?)";
    private static String updateQuery = "update Skill set name=?, description=?, type=? where id=?";

    /**
     * REST API link to get all skills data
     * @param token The unique token of the User making the API call
     * @return Response containing all the skills
     */
    @RequestMapping("/skills/view")
    public SkillsResponse skills(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return SkillsResponse.skillsFailure("User is not logged in");
        }
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
                Skill s = new Skill(set.getString("id"),
                                    set.getString("name"),
                                    set.getString("description"),
                                    set.getString("type"));
                skills.add(s);
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Skills Failed: " + e.getMessage());
            return SkillsResponse.skillsFailure(e.getMessage());
        }

        return new SkillsResponse(skills);
    }

    /**
     * REST API Call to add a new skill
     * @param token The unique token of the User making the API call
     * @param name The name of the Skill
     * @param description The description of the skill
     * @param type The type of the skill
     * @return Response with the newly Added Skill or an error response
     */
    @RequestMapping("/skills/add")
    public SkillsAddResponse addSkill(
            @RequestParam("token") String token,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") String type) {
        if (!isUserLoggedIn(token)) {
            return SkillsAddResponse.addSkillsFailure("User not logged in");
        }
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        String id = UUID.randomUUID().toString();
        Skill skill = new Skill(id, name, description, type);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return SkillsAddResponse.addSkillsFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(insertQuery);
            int i = 1;
            st.setString(i++, skill.getId());
            st.setString(i++, skill.getName());
            st.setString(i++, skill.getType());
            st.setString(i++, skill.getDescription());
            int success = st.executeUpdate();
            if (success == 0) {
                SkillsAddResponse.addSkillsFailure("Failed to add skill");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add skill failed: " + e.getMessage());
            return SkillsAddResponse.addSkillsFailure(e.getMessage());
        }
        return new SkillsAddResponse(skill);
    }

    /**
     * REST API link to update an existing skill
     * @param token The unique token of the User making the API call
     * @param id The id of the skill to be updated
     * @param name The name of the skill
     * @param description The description of the skill
     * @param type The type of the skill
     * @return Response containing the updated skill or an error response
     */
    @RequestMapping("/skills/edit")
    public SkillsEditResponse editSkill(
            @RequestParam("token") String token,
            @RequestParam("id") String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") String type) {
        if (!isUserLoggedIn(token)) {
            return SkillsEditResponse.editSkillFailure("User is not logged in");
        }
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
            st.setString(i++, skill.getId());
            int success = st.executeUpdate();
            if (success == 0) {
                SkillsEditResponse.editSkillFailure("Edit skill failed");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit skill failed: " + e.getMessage());
            return SkillsEditResponse.editSkillFailure(e.getMessage());
        }
        return new SkillsEditResponse(skill);
    }
}
