package server.rest.responses;

import server.model.Skill;

/**
 * Created by vaast on 13/11/2017.
 */
public class SkillsAddResponse extends Response {

    Skill s;

    public static SkillsAddResponse addSkillsFailure(String msg) {
        Skill s = new Skill(0, "NA", "NA", "NA");
        SkillsAddResponse response = new SkillsAddResponse(s);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public  SkillsAddResponse(Skill s) {
        this.s = s;
    }

    public Skill getSkill() {
        return s;
    }
}
