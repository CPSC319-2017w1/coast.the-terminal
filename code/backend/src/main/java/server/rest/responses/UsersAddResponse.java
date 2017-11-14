package server.rest.responses;

import server.model.User;

/**
 * Created by vaast on 13/11/2017.
 */
public class UsersAddResponse extends Response {
    User user;

    public static UsersAddResponse addUserFailure(String msg) {
        User user = new User("","","");
        UsersAddResponse response = new UsersAddResponse(user);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public UsersAddResponse(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
