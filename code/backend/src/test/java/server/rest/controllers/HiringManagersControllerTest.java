package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.HiringManager;
import server.rest.responses.HiringManagersResponse;

import java.sql.SQLException;
import java.util.ArrayList;

import static org.assertj.core.api.Fail.fail;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class HiringManagersControllerTest {
    HiringManagersController hiringManagersController;

    @BeforeEach
    public void initController() {
        hiringManagersController = new HiringManagersController();
    }

    @Test
    void viewHiringManagersTest() {
        ArrayList<HiringManager> managers = null;
        try {
            managers = hiringManagersController.getHiringManagers();
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        assertFalse(managers.isEmpty());
    }
}
