package server.rest.responses;

import server.model.User;

/**
 * Response object for REST API add user link
 */
public class UsersAddResponse extends Response {
    User user;

    /**
     * Creates an error response object
     * @param msg Error message
     * @return Error response object
     */
    public static UsersAddResponse addUserFailure(String msg) {
        User user = new User("","","");
        UsersAddResponse response = new UsersAddResponse(user);
        response.setError(true);
        response.setErrorMessage(msg);
        return response;
    }

    /**
     * Creates a new UsersAddResponse object
     * @param user
     */
    public UsersAddResponse(User user) {
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
