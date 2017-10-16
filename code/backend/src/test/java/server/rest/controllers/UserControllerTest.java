package server.rest.controllers;

import org.junit.jupiter.api.Test;
import server.rest.responses.LoginResponse;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {
    private static final String LOGIN_INCORRECT_RESPONSE = "Incorrect username or password";

    @Test
    void loginFailure() {
        String exampleUsenname = "exUsername";
        String examplePassword = "exPassword";
        UserController controller = new UserController();
        LoginResponse response = controller.login(exampleUsenname, examplePassword);

        assertEquals(LOGIN_INCORRECT_RESPONSE,response.getErrorMessage());
    }
    @Test
    void loginSuccessAdmin() {
        final String EXPECTED_PERMISSIONS = "admin";
        String adminUsername = "admin";
        String adminPassword = "admin";
        UserController controller = new UserController();
        LoginResponse response = controller.login(adminUsername, adminPassword);

        assertEquals( EXPECTED_PERMISSIONS, response.getPermissions());
    }
}