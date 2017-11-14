package server.rest.responses;

import server.model.Skill;

/**
 * Created by vaast on 13/11/2017.
 */
public class SkillsEditResponse extends Response {
    Skill skill;

    public static SkillsEditResponse editSkillFailure(String msg) {
        Skill skill = new Skill("", "NA", "NA", "NA");
        SkillsEditResponse response = new SkillsEditResponse(skill);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public SkillsEditResponse(Skill skill) {
        this.skill = skill;
    }

    public Skill getSkill() {
        return skill;
    }
}
