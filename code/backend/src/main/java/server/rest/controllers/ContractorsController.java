package server.rest.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.database.DatabaseConnection;
import server.model.Contractor;
import server.rest.responses.ContractorsResponse;
import server.rest.responses.Response;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"})
@RestController
public class ContractorsController extends Controller {
    private static String getQuery = "select * from Contractor;";
    private static String insertContractorQuery = "INSERT INTO Contractor(id, firstName, surname, agencySource, status, rehire) VALUES (?,?,?,?,?,?)";

    @RequestMapping("/contractors/view")
    public ContractorsResponse contractors() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<Contractor> contractors = new ArrayList<Contractor>();

        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return ContractorsResponse.contractorsFailure("Failed to connect to database");
            }
            PreparedStatement st = connection.getPreparedStatement(getQuery);
            ResultSet set = st.executeQuery();
            while(set.next()) {
                Contractor c = new Contractor(set.getString("id"),
                                              set.getString("firstName"),
                                              set.getString("surname"),
                                              set.getString("agencySource"),
                                              set.getString("status"),
                                              set.getBoolean("rehire"));
                contractors.add(c);
            }
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Get Contractors Failed: " + e.getMessage());
            return ContractorsResponse.contractorsFailure(e.getMessage());
        }

        return new ContractorsResponse(contractors);
    }

    @RequestMapping("/contractors/add")
    public ContractorsResponse addContractor(
            @RequestParam("firstName") String firstName,
            @RequestParam("surname") String surName,
            @RequestParam("agencySource") String agencySource) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        List<Contractor> newContractor = new ArrayList<>();

        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return ContractorsResponse.contractorsFailure("Failed to connect to database");
            }
            String newContractorId = UUID.randomUUID().toString();
            final String status = "active";
            final boolean rehire = false;
            PreparedStatement st = connection.getPreparedStatement(insertContractorQuery);
            int i =1;
            st.setString(i++, newContractorId);
            st.setString(i++, firstName);
            st.setString(i++, surName);
            st.setString(i++, agencySource);
            st.setString(i++, status);
            st.setBoolean(i++, rehire);
            int success = st.executeUpdate();
            connection.commitTransaction();
            if(success == 0){
                return ContractorsResponse.contractorsFailure("Failed to add contractor. SQL Update failed");
            }

            Contractor contractor = new Contractor(newContractorId, firstName, surName, agencySource, status, false);
            newContractor.add(contractor);
        } catch (SQLException e) {

            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Contractor Failed: " + e.getMessage());
            return ContractorsResponse.contractorsFailure(e.getMessage());
        }

        return new ContractorsResponse(newContractor);
    }

    @RequestMapping("/contractors/edit")
    public Response editContractor(Contractor contractor) {
        //TODO
        return new Response();
    }
}
