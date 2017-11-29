package server.rest.responses;

import server.model.Skill;

/**
 * Response object for the REST API add skill link
 */
public class SkillsAddResponse extends Response {

    Skill s;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static SkillsAddResponse addSkillsFailure(String msg) {
        Skill s = new Skill("", "NA", "NA", "NA");
        SkillsAddResponse response = new SkillsAddResponse(s);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a SkillsAddResponse object
     * @param s Skill that is part of the response
     */
    public  SkillsAddResponse(Skill s) {
        this.s = s;
    }

    /**
     * Gets the skill object
     * @return The skill object
     */
    public Skill getSkill() {
        return s;
    }
}
