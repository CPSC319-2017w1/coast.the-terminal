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

        assertEquals(response.getErrorMessage(), LOGIN_INCORRECT_RESPONSE);
    }
}