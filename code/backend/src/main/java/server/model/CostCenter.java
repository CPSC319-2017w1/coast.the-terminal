package server.model;

public class CostCenter {
    private String id;
    private String location;

    public CostCenter(String id, String location) {
        this.id = id;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }
}
