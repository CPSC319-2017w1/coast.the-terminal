package server.rest.responses;

import server.model.User;

/**
 * Response Object for REST API edit user link
 */
public class UsersEditResponse extends Response {
    User user;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static UsersEditResponse usersEditFailure(String msg) {
        User user = new User("", "", "");
        UsersEditResponse response = new UsersEditResponse(user);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a UsersEditResponse Object
     * @param user
     */
    public UsersEditResponse(User user) {
        this.user = user;
    }

    /**
     * Gets the user object
     * @return The user object
     */
    public User getUser() {
        return user;
    }
}
