package server.rest.responses;

import server.model.User;

/**
 * Created by vaast on 13/11/2017.
 */
public class UsersEditResponse extends Response {
    User user;

    public static UsersEditResponse usersEditFailure(String msg) {
        User user = new User("", "", "");
        UsersEditResponse response = new UsersEditResponse(user);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    public UsersEditResponse(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
