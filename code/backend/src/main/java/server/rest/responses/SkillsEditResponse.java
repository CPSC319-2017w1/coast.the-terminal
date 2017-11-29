package server.rest.responses;

import server.model.Skill;

/**
 * Response object for the REST API edit skill link
 */
public class SkillsEditResponse extends Response {
    Skill skill;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static SkillsEditResponse editSkillFailure(String msg) {
        Skill skill = new Skill("", "NA", "NA", "NA");
        SkillsEditResponse response = new SkillsEditResponse(skill);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a new SkillsEditResponse object
     * @param skill Skill to be part of the response
     */
    public SkillsEditResponse(Skill skill) {
        this.skill = skill;
    }

    /**
     * Gets the skill object
     * @return The skill object
     */
    public Skill getSkill() {
        return skill;
    }
}
