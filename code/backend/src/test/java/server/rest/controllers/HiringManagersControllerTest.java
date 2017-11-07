package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.rest.responses.HiringManagersResponse;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class HiringManagersControllerTest {
    HiringManagersController hiringManagersController;

    @BeforeEach
    public void initController() {
        hiringManagersController = new HiringManagersController();
    }

    @Test
    void viewHiringManagersTest() {
        HiringManagersResponse response = hiringManagersController.hiringmanagers();
        assertFalse(response.isError());
        assertFalse(response.getHiringManagers().isEmpty());
    }
}
