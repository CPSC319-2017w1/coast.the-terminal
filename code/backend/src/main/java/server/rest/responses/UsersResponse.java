package server.rest.responses;

import server.model.User;

import java.util.ArrayList;

/**
 * Created by vaast on 31/10/2017.
 */
public class UsersResponse extends Response {

    private ArrayList<User> users;

    public static UsersResponse usersResponseFailure(String msg) {
        ArrayList<User> users = new ArrayList<User>();
        UsersResponse response = new UsersResponse(users);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public UsersResponse(ArrayList<User> users) {
        this.users = users;
    }
}
