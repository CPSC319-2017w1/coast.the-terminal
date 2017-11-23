package server.rest.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import server.model.Contractor;
import server.rest.responses.ContractorsResponse;
import server.rest.responses.Response;

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
        ContractorsResponse response = contractorController.contractors();
        assertFalse(response.isError());
        assertFalse(response.getContractors().isEmpty());
    }

    @Test
    public void addContractorsTest() {
        Contractor contractor = new Contractor(UUID.randomUUID().toString(), "Test first name", "test last name", "ex agency source", "active", true);
        Response response = contractorController.addContractor("Test first name" , "testSurname", "agency source", "active");
        assertFalse(response.isError());
    }

    @Test
    public void editContractorsTest() {
        final int FIRST = 0;
        Contractor contractor = contractorController.contractors().getContractors().get(FIRST);
        contractor.setAgencySource("Test New Agency Source");
        Response response = contractorController.editContractor(contractor.getId(), contractor.getFirstName(), contractor.getLastName(), contractor.getAgencySource(), contractor.getStatus());
        assertFalse(response.isError());
    }
}