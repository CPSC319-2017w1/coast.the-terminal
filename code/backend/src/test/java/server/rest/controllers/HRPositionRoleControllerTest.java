package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.model.HRPositionRole;
import server.rest.responses.HRPositionRoleResponse;

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
        HRPositionRoleResponse response =  hrPositionRoleController.hrroles();
        assertFalse(response.isError());
        assertFalse(response.getHrPositionRoles().isEmpty());
    }

}