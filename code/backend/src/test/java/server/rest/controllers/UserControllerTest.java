package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.User;
import server.rest.responses.LoginResponse;
import server.rest.responses.Response;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {
    private static final String LOGIN_INCORRECT_RESPONSE = "Incorrect username or password";
    private UserController controller;

    @BeforeEach
    public void setUpController(){
        controller = new UserController();
    }

    @Test
    void loginFailure() {
        String LOGIN_INCORRECT_RESPONSE = "Incorrect username or password";
        String exampleUsenname = "exUsername";
        String examplePassword = "exPassword";
        LoginResponse response = controller.login(exampleUsenname, examplePassword);

        assertEquals(LOGIN_INCORRECT_RESPONSE,response.getErrorMessage());
    }
    @Test
    void loginSuccessAdmin() {
        final String EXPECTED_PERMISSIONS = "admin";
        String adminUsername = "admin";
        String adminPassword = "admin";
        LoginResponse response = controller.login(adminUsername, adminPassword);

        assertEquals(EXPECTED_PERMISSIONS, response.getPermissions());
    }
    @Test
    void loginSuccessNonAdmin() {
        final String EXPECTED_PERMISSIONS = "write";
        String username = "user";
        String userPassword = "user";
        LoginResponse response = controller.login(username, userPassword);

        assertEquals(EXPECTED_PERMISSIONS, response.getPermissions());
    }

    @Test
    void addUserTest() {
        User user = new User("testUsername", "testPassword", "none");
        try {
            User user1 = controller.addUser(user.getUsername(), user.getPassword(), user.getPermissions());
            assertTrue(controller.getUsers().contains(user));
        } catch (SQLException e) {
            fail(e.getMessage());
        }
    }

    @Test
    void editUserTest() {
        final int FIRST = 0;
        try {
            List<User> allUsers = controller.getUsers();
            User user = allUsers.get(FIRST);
            user.setPermissions("write");
            User user1 = controller.editUser(user.getUsername(), user.getPassword(), user.getPermissions());
            assertEquals(controller.getUsers().get(FIRST), user);
        } catch (SQLException e) {
            fail(e.getMessage());
        }
    }

}