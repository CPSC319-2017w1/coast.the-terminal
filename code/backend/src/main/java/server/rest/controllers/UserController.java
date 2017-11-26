package server.rest.controllers;

import org.springframework.web.bind.annotation.*;
import server.database.DatabaseConnection;
import server.model.User;
import server.rest.responses.*;
import server.session.AuthenticationController;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class UserController extends Controller {
    private static final String loginQuery = "select * from User where username=? and password=?";
    private static final String usersQuery = "select * from User";
    private static String updateQuery = "update User set password=?, permissions=? where username=?";
    private static String addQuery = "insert into User values(?, ?, ?)";

    public ArrayList<User> getUsers() throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<User> users = new ArrayList<User>();
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Can't connect to Database");
        }
        PreparedStatement st = connection.getPreparedStatement(usersQuery);
        ResultSet set = st.executeQuery();
        while(set.next()) {
            User user = new User(set.getString("username"),
                    set.getString("password"),
                    set.getString("permissions"));
            users.add(user);
        }
        connection.closeConnection();
        return users;
    }

    public User editUser(String username, String password, String permissions) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        User user = new User(username, password, permissions);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(updateQuery);
        int index = 1;
        st.setString(index++, user.getPassword());
        st.setString(index++, user.getPermissions());
        st.setString(index++, user.getUsername());
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to edit user");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return user;
    }

    public User addUser(String username, String password, String permissions) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        User user = new User(username, password, permissions);
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to add user");
        }
        PreparedStatement st = connection.getPreparedStatement(addQuery);
        int index = 1;
        st.setString(index++, username);
        st.setString(index++, password);
        st.setString(index++, permissions);
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Add user failed");
        }
        connection.commitTransaction();
        connection.closeConnection();
        return user;
    }

    @RequestMapping("/login")
    public LoginResponse login(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        boolean success = true;
        String user = username;
        String permissions = "none";
        String token = "";
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return LoginResponse.loginFailure("Failed to open database connection");
            }
            PreparedStatement st = connection.getPreparedStatement(loginQuery);
            st.setString(1, username);
            st.setString(2, password);
            ResultSet resultSet = st.executeQuery();
            if (!resultSet.isBeforeFirst()) {
                return LoginResponse.loginFailure("Incorrect username or password");
            }
            resultSet.next();
            user = resultSet.getString("username");
            permissions = resultSet.getString("permissions");
            token = AuthenticationController.login(username);
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Login failed: " + e.getMessage());
        }

        //NOTE Spring automatically converts all fields with getters into JSON for transmission
        return new LoginResponse(user, success, permissions, token);
    }

    @RequestMapping("/users/view")
    public UsersResponse users(@RequestParam("token") String token) {
        if (!isUserLoggedIn(token)) {
            return UsersResponse.usersResponseFailure("User is not logged in");
        }
        ArrayList<User> users;
        try {
            users = this.getUsers();
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get users failed: " + e.getMessage());
            return UsersResponse.usersResponseFailure(e.getMessage());
        }
        return new UsersResponse(users);
    }
    @RequestMapping("/users/edit")
    public UsersEditResponse editUser(
            @RequestParam("token") String token,
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("permissions") String permissions) {
        if (!isUserLoggedIn(token)) {
            return UsersEditResponse.usersEditFailure("User is not logged in");
        }
        User user;
        try {
            user = this.editUser(username, password, permissions);
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Edit user failed: " + e.getMessage());
            return UsersEditResponse.usersEditFailure("Edit user failed: " + e.getMessage());
        }
        return new UsersEditResponse(user);
    }

    @RequestMapping("/users/add")
    public UsersAddResponse addUser(
            @RequestParam("token") String token,
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("permissions") String permissions) {
        if (!isUserLoggedIn(token)) {
            return UsersAddResponse.addUserFailure("User is not logged in");
        }
        User user = null;
        try {
            user = this.addUser(username, password, permissions);
        } catch(SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add user failed: " + e.getMessage());
        }
        return new UsersAddResponse(user);
    }

    @RequestMapping("/users/delete")
    public Response deleteUser(User user) {
        //TODO
        return new Response();
    }
}
