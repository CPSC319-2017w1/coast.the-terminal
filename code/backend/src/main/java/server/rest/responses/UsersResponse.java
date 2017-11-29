package server.rest.responses;

import server.model.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Response object for REST API view users link
 */
public class UsersResponse extends Response {

    private ArrayList<User> data;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static UsersResponse usersResponseFailure(String msg) {
        ArrayList<User> users = new ArrayList<User>();
        UsersResponse response = new UsersResponse(users);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a new UsersResponse Object
     * @param users List of users part of the response object
     */
    public UsersResponse(ArrayList<User> users) {
        this.data = users;
    }

    /**
     * Gets the list of users
     * @return The list of userss
     */
    public List<User> getData() {
        return this.data;
    }
}
