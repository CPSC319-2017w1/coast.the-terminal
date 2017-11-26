package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.HRPositionRole;
import server.rest.responses.HRPositionRoleResponse;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class HRPositionRoleControllerTest {
    HRPositionRoleController hrPositionRoleController;
    @BeforeEach
    public void initController() {
        hrPositionRoleController = new HRPositionRoleController();
    }

    @Test
    void viewHRPositionsTest(){
        ArrayList<HRPositionRole> roles = new ArrayList<HRPositionRole>();
        try {
            roles =  hrPositionRoleController.getHRRoles();
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        assertFalse(roles.isEmpty());
    }

}