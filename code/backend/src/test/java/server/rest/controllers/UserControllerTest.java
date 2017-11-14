package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.User;
import server.rest.responses.LoginResponse;
import server.rest.responses.Response;

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
        Response response = controller.addUser(user.getUsername(), user.getPassword(), user.getPermissions());
        assertFalse(response.isError());
        assertTrue(controller.users().getUsers().contains(user));
    }

    @Test
    void editUserTest() {
        final int FIRST = 0;
        List<User> allUsers = controller.users().getUsers();
        User user = allUsers.get(FIRST);
        user.setPermissions("write");
        Response response = controller.editUser(user.getUsername(), user.getPassword(), user.getPermissions());
        assertFalse(response.isError());
        assertEquals(controller.users().getUsers().get(FIRST), user);
    }

    @Test
    void deleteUserTest() {
        final int FIRST = 0;
        List<User> allUsers = controller.users().getUsers();
        User user = allUsers.get(FIRST);
        Response response = controller.deleteUser(user);
        assertFalse(response.isError());
        assertFalse(controller.users().getUsers().contains(user));
    }
}