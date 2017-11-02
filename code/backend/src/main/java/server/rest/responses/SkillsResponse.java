package server.rest.responses;

import server.model.Skill;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class SkillsResponse extends Response {
    private ArrayList<Skill> skills;

    public static SkillsResponse skillsFailure(String msg) {
        ArrayList<Skill> skills = new ArrayList<Skill>();
        SkillsResponse response = new SkillsResponse(skills);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public SkillsResponse(ArrayList<Skill> skills) {
        this.skills = skills;
    }

    public ArrayList<Skill> getSkills() {
        return skills;
    }
}
