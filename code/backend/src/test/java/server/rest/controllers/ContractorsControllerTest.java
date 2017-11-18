package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import server.model.Contractor;
import server.rest.responses.ContractorsResponse;
import server.rest.responses.Response;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;


class ContractorsControllerTest {
    ContractorsController contractorController;

    @BeforeEach
    public void initController() {
        contractorController = new ContractorsController();
    }

    @Test()
    public void contractorsTest() {
        ArrayList<Contractor> contractors = null;
        try {
            contractors = contractorController.getContractors();
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        assertFalse(contractors.isEmpty());
    }

    @Test
    public void addContractorsTest() {
        List<Contractor> contractors = new ArrayList<Contractor>();
        try {
            contractors = contractorController.addContractor("Test first name" , "testSurname", "agency source", "active");
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        assertFalse(contractors.isEmpty());
    }

    @Test
    public void editContractorsTest() {
        final int FIRST = 0;
        Contractor contractor = null;
        try {
            contractor = contractorController.getContractors().get(FIRST);
        } catch (SQLException e) {
            fail(e.getMessage());
        }
        /*
        contractor.setAgencySource("Test New Agency Source");
        Response response = contractorController.editContractor(contractor.getId(), contractor.getFirstName(), contractor.getLastName(), contractor.getAgencySource(), contractor.getStatus());
        assertFalse(response.isError());
        */
    }
}