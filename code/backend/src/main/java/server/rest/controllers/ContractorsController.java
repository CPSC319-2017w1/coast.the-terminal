package server.rest.controllers;

import org.springframework.web.bind.annotation.*;
import server.database.DatabaseConnection;
import server.model.*;
import server.rest.responses.ContractorsResponse;
import server.rest.responses.Response;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"http://localhost:1234","http://theterminal.s3-website.us-west-2.amazonaws.com"}, methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
public class ContractorsController extends Controller {
    private final static String DATE_FORMAT = "yyyy-MM-dd";
    private final static String getQuery = "select * from Contractor";
    private final static String insertContractorQuery = "INSERT INTO Contractor(id, firstName, surname, agencySource, status, rehire) VALUES (?,?,?,?,?,?)";
    private static final String editContractorQuery = "UPDATE Contractor SET firstName=?, surname=?, agencySource=?, status=? WHERE id=?";
    private final static String insertEngagementContractQuery = "INSERT INTO EngagementContract(" +
            "id," +
            "startDate," +
            "endDate," +
            "rateType," +
            "projectName," +
            "chargeType," +
            "dailyAllowance," +
            "originalDocumentation," +
            "terminationNum," +
            "contractorId," +
            "resourceId," +
            "hrPositionId," +
            "hrPayGradeId," +
            "costCenterId," +
            "reportingManagerUserId," +
            "currencyCode," +
            "mainSkillId," +
            "timeAndMaterialTerms," +
            "poNum," +
            "hourlyRate)" +
            "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    private final static String editEngagementContractorQuery = "UPDATE EngagementContract SET " +
            "startDate=?, " +
            "endDate=?, " +
            "rateType=?, " +
            "projectName=?, " +
            "chargeType=?, " +
            "dailyAllowance=?, " +
            "originalDocumentation=?, " +
            "terminationNum=?, " +
            "contractorId=?, " +
            "resourceId=?, " +
            "hrPositionId=?, " +
            "hrPayGradeId=?, " +
            "costCenterId=?, " +
            "reportingManagerUserId=?, " +
            "currencyCode=?, " +
            "mainSkillId=?, " +
            "timeAndMaterialTerms=?, " +
            "poNum=?, " +
            "hourlyRate=? " +
            "WHERE id=?";

    private final static String viewAllContractorDataQuery = "SELECT * FROM Contractor c\n" +
            "INNER JOIN EngagementContract e ON e.contractorId=c.id\n" +
            "INNER JOIN HRPositionRole p ON p.id=e.hrPositionId\n" +
            "INNER JOIN HRPayGrade pg ON pg.id=e.hrPayGradeId\n" +
            "INNER JOIN CostCenter cc on cc.id=e.costCenterId\n" +
            "INNER JOIN Skill s on s.id=e.mainSkillId\n" +
            "INNER JOIN HiringManager rp on rp.userId=e.reportingManagerUserId\n" +
            "ORDER BY c.id";

    public ArrayList<Contractor> editContractorImpl(String id, String firstName, String lastName, String agencySource, String status) throws SQLException {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        ArrayList<Contractor> contractors = new ArrayList<Contractor>();
        connection.openConnection();
        if (!connection.isConnected()) {
            throw new SQLException("Failed to connect to database");
        }
        PreparedStatement st = connection.getPreparedStatement(editContractorQuery);
        int index=1;
        st.setString(index++, firstName);
        st.setString(index++, lastName);
        st.setString(index++, agencySource);
        st.setString(index++, status);
        st.setString(index++, id);
        int success = st.executeUpdate();
        if (success == 0) {
            throw new SQLException("Failed to update Contractor data");
        }
        connection.commitTransaction();
        connection.closeConnection();
        Contractor c = new Contractor(id, firstName, lastName, agencySource, status, true);
        contractors.add(c);
        return contractors;
    }

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
            connection.closeConnection();
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
            @RequestParam("agencySource") String agencySource,
            @RequestParam("status") String status) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        List<Contractor> newContractor = new ArrayList<>();

        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return ContractorsResponse.contractorsFailure("Failed to connect to database");
            }
            String newContractorId = UUID.randomUUID().toString();
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
            connection.closeConnection();
        } catch (SQLException e) {

            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Contractor Failed: " + e.getMessage());
            return ContractorsResponse.contractorsFailure(e.getMessage());
        }

        return new ContractorsResponse(newContractor);
    }

    @CrossOrigin("*")
    @RequestMapping(value = "/contractors/edit/engagementContract", method={RequestMethod.POST})
    public Response editEngagementContract(
            @RequestParam("id") String id,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("rateType") String rateType,
            @RequestParam("projectName") String projectName,
            @RequestParam("chargeType") String chargeType,
            @RequestParam("dailyAllowance") int dailyAllowance,
            @RequestParam("originalDocumentation") String originalDocumentation,
            @RequestParam("terminationNum") int terminationNum,
            @RequestParam("contractorId") String contractorId,
            @RequestParam("resourceId") String resourceId,
            @RequestParam("hrPositionId") String hrPositionId,
            @RequestParam("hrPayGradeId") String hrPayGradeId,
            @RequestParam("costCenterId") String costCenterId,
            @RequestParam("reportingManagerId") String reportingManagerId,
            @RequestParam("currencyCode") String currencyCode,
            @RequestParam("mainSkillId") String mainSkillId,
            @RequestParam("timeMaterialTerms") int timeMaterialTerms,
            @RequestParam("poNum") int poNum,
            @RequestParam("hourlyrate") int hourlyRate
    ) {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return Response.createErrorResponse("Edit engagement Contract: Failed to open database");
            }
            java.sql.Date startDateSQL = getSQLDate(startDate);
            java.sql.Date endDateSQL = getSQLDate(endDate);

            PreparedStatement st = connection.getPreparedStatement(editEngagementContractorQuery);
            int i = 1;
            st.setDate(i++, startDateSQL);
            st.setDate(i++, endDateSQL);
            st.setString(i++, rateType);
            st.setString(i++, projectName);
            st.setString(i++, chargeType);
            st.setInt(i++, dailyAllowance);
            st.setString(i++, originalDocumentation);
            st.setInt(i++, terminationNum);
            st.setString(i++, contractorId);
            st.setString(i++, resourceId);
            st.setString(i++, hrPositionId);
            st.setString(i++, hrPayGradeId);
            st.setString(i++, costCenterId);
            st.setString(i++, reportingManagerId);
            st.setString(i++, currencyCode);
            st.setString(i++, mainSkillId);
            st.setInt(i++, timeMaterialTerms);
            st.setInt(i++, poNum);
            st.setInt(i++, hourlyRate);
            st.setString(i++, id);
            int success = st.executeUpdate();
            if(success == 0) {
                return Response.createErrorResponse("Add Engagement Contract failed. SQL Update failed");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, e.getMessage());
            Response.createErrorResponse("Edit engagement Contract: " + e.getMessage());
        } catch (ParseException e) {
            Logger.getAnonymousLogger().log(Level.INFO, e.getMessage());
            Response.createErrorResponse("Edit engagement Contract: " + e.getMessage());
        }
        return new Response();
    }

    @CrossOrigin("*")
    @RequestMapping(value = "/contractors/add/engagementContract", method={RequestMethod.POST})
    public Response addEngagementContract(@RequestParam("startDate") String startDate,
                                          @RequestParam("endDate") String endDate,
                                          @RequestParam("rateType") String rateType,
                                          @RequestParam("projectName") String projectName,
                                          @RequestParam("chargeType") String chargeType,
                                          @RequestParam("dailyAllowance") int dailyAllowance,
                                          @RequestParam("originalDocumentation") String originalDocumentation,
                                          @RequestParam("terminationNum") int terminationNum,
                                          @RequestParam("contractorId") String contractorId,
                                          @RequestParam("resourceId") String resourceId,
                                          @RequestParam("hrPositionId") String hrPositionId,
                                          @RequestParam("hrPayGradeId") String hrPayGradeId,
                                          @RequestParam("costCenterId") String costCenterId,
                                          @RequestParam("reportingManagerId") String reportingManagerId,
                                          @RequestParam("currencyCode") String currencyCode,
                                          @RequestParam("mainSkillId") String mainSkillId,
                                          @RequestParam("timeMaterialTerms") int timeMaterialTerms,
                                          @RequestParam("poNum") int poNum,
                                          @RequestParam("hourlyrate") int hourlyRate) {

        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return Response.createErrorResponse("Add Engagement Contract: Error opening database connection");
            }

            String engagementContractId = UUID.randomUUID().toString();
            java.sql.Date startDateSQL = getSQLDate(startDate);
            java.sql.Date endDateSQL = getSQLDate(endDate);

            PreparedStatement st = connection.getPreparedStatement(insertEngagementContractQuery);
            int i = 1;
            st.setString(i++, engagementContractId);
            st.setDate(i++, startDateSQL);
            st.setDate(i++, endDateSQL);
            st.setString(i++, rateType);
            st.setString(i++, projectName);
            st.setString(i++, chargeType);
            st.setInt(i++, dailyAllowance);
            st.setString(i++, originalDocumentation);
            st.setInt(i++, terminationNum);
            st.setString(i++, contractorId);
            st.setString(i++, resourceId);
            st.setString(i++, hrPositionId);
            st.setString(i++, hrPayGradeId);
            st.setString(i++, costCenterId);
            st.setString(i++, reportingManagerId);
            st.setString(i++, currencyCode);
            st.setString(i++, mainSkillId);
            st.setInt(i++, timeMaterialTerms);
            st.setInt(i++, poNum);

            int success = st.executeUpdate();
            if(success == 0) {
                return Response.createErrorResponse("Add Engagement Contract failed. SQL Update failed");
            }
            connection.commitTransaction();
            connection.closeConnection();
        } catch (SQLException e) {

            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Engagement Contract Failed: " + e.getMessage());
            return Response.createErrorResponse("Add Engagement Contract failed: " + e.getMessage());
        } catch (ParseException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "Add Engagement Contract Failed: " + e.getMessage());
            return Response.createErrorResponse("Add Engagement Contract Failed:" + e.getMessage());
        }

        return new Response();
    }

    private java.sql.Date getSQLDate(String date) throws ParseException {
        Date dateParsed = new SimpleDateFormat(DATE_FORMAT).parse(date);
        return new java.sql.Date(dateParsed.getTime());
    }

    @RequestMapping("/contractors/edit")
    public ContractorsResponse editContractor(
            @RequestParam("id") String id,
            @RequestParam("firstName") String firstName,
            @RequestParam("surname") String surname,
            @RequestParam("agencySource") String agencySource,
            @RequestParam("status") String status) {

        ArrayList<Contractor> contractors;
        try {
            contractors = editContractorImpl(id, firstName, surname, agencySource, status);
        } catch (SQLException e) {
            Logger.getAnonymousLogger().log(Level.INFO, e.getMessage());
            return ContractorsResponse.contractorsFailure(e.getMessage());
        }
        return new ContractorsResponse(contractors);
    }

    @RequestMapping("/contractors/viewAllData")
    public Response viewAllContractorData() {
        DatabaseConnection connection = new DatabaseConnection(dbConnectionUrl, dbUsername, dbPassword);
        List<Contractor> allContractorData = new ArrayList<>();

        try {
            connection.openConnection();
            if (!connection.isConnected()) {
                return ContractorsResponse.createErrorResponse("View All Data Failed: Error opening database connection");
            }

            PreparedStatement st = connection.getPreparedStatement(viewAllContractorDataQuery);
            ResultSet set = st.executeQuery();
            Contractor lastContractor = null;
            while(set.next()) {
                String contractorId = set.getString("c.id");
                if(lastContractor == null || !lastContractor.getId().equals(contractorId)) {
                    //get contractor data
                    lastContractor = new Contractor(contractorId,
                            set.getString("c.firstName"),
                            set.getString("c.surname"),
                            set.getString("agencySource"),
                            set.getString("status"),
                            set.getBoolean("rehire"));

                    allContractorData.add(lastContractor);
                }

                CostCenter costCenter = new CostCenter(
                        set.getString("cc.id"),
                        set.getString("location")
                );

                HRPositionRole positionRole = new HRPositionRole(
                        set.getString("p.id"),
                        set.getString("roleName"),
                        set.getString("p.description")
                );

                HRPayGrade payGrade = new HRPayGrade(
                        set.getString("pg.id"),
                        set.getInt("startAmount"),
                        set.getInt("endAmount"),
                        set.getString("pg.name")
                );

                Skill mainSkill = new Skill(
                        set.getString("s.id"),
                        set.getString("s.name"),
                        set.getString("type"),
                        set.getString("s.description")
                );


                EngagementContract newContract = new EngagementContract(
                        set.getString("e.id"),
                        set.getDate("startDate"),
                        set.getDate("endDate"),
                        set.getString("rateType"),
                        set.getString("projectName"),
                        set.getString("chargeType"),
                        set.getInt("dailyAllowance"),
                        set.getString("originalDocumentation"),
                        set.getInt("terminationNum"),
                        costCenter,
                        set.getString("currencyCode"),
                        set.getInt("timeAndMaterialTerms"),
                        set.getInt("poNum"),
                        set.getInt("hourlyRate"),
                        positionRole,
                        payGrade,
                        mainSkill,
                        set.getBoolean("rehire")
                );

                lastContractor.addEngagementContract(newContract);
            }
            connection.closeConnection();
        } catch (SQLException e) {
            Logger logger = Logger.getAnonymousLogger();
            logger.log(Level.INFO, "View all contractor data failed: " + e.getMessage());
            return ContractorsResponse.createErrorResponse("View all contractor data failed: " + e.getMessage());
        }

        return new ContractorsResponse(allContractorData);
    }
}

