package server.rest.responses;

import server.model.Skill;

import java.util.ArrayList;

/**
 * Response Object for the REST API view skills link
 */
public class SkillsResponse extends Response {
    private ArrayList<Skill> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static SkillsResponse skillsFailure(String msg) {
        ArrayList<Skill> skills = new ArrayList<Skill>();
        SkillsResponse response = new SkillsResponse(skills);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a new SkillsResponse object
     * @param skills The list of skills that are part of the response
     */
    public SkillsResponse(ArrayList<Skill> skills) {
        this.data = skills;
    }

    /**
     * Gets the list of skills
     * @return The list of skills
     */
    public ArrayList<Skill> getData() {
        return data;
    }
}
