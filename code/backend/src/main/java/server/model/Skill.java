package server.model;

/**
 * Created by vaast on 31/10/2017.
 */
public class Skill {
    private int id;
    public String name;
    public String description;
    public String type;

    /**
     * Creates a skill object
     * @param id Id of the skill in the database
     * @param name Name of the skill
     * @param description Description of the skill
     * @param type Type of the skill
     */
    public Skill(int id, String name, String description, String type) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.type = type;
    }

    /**
     * Gets the id of the skill
     * @return the id of the skill
     */
    public int getId() {
        return id;
    }

    /**
     * Gets the description of the skill
     * @return the description of the skill
     */
    public String getDescription() {
        return description;
    }

    /**
     * Gets the name of the skill
     * @return the name of the skill
     */
    public String getName() {
        return name;
    }

    /**
     * Gets the type of the skill
     * @return the type of the skill
     */
    public String getType() {
        return type;
    }
}
