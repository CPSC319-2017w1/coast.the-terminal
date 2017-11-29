package server.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

/**
 * Created by vaast on 31/10/2017.
 */
public class Contractor {
    private String id;
    private String firstName;
    private String lastName;
    private String agencySource;
    private String status;
    private boolean rehire;
    private List<EngagementContract> contracts;

    /**
     * Creates a Contractor Object
     * @param id Id of the contractor
     * @param firstName First Name of the Contractor
     * @param lastName Last Name of the Contractor
     * @param agencySource Agency Source of the Contractor
     * @param status Status of the Contractor
     * @param rehire Rehire status of the Contractor
     */
    public Contractor(String id, String firstName, String lastName, String agencySource, String status, boolean rehire) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.agencySource = agencySource;
        this.status = status;
        this.rehire = rehire;
        this.contracts = new ArrayList<>();
    }

    /**
     * Gets the Id of the current contractor
     * @return The id of the contractor
     */
    public String getId() {
        return id;
    }

    /**
     * Gets the rehire status of the current contractor
     * @return The rehire status of the contractor
     */
    public boolean isRehire() {
        return rehire;
    }

    /**
     * Gets the Agency Source of the current contractor
     * @return The agency source of the contractor
     */
    public String getAgencySource() {
        return agencySource;
    }

    /**
     * Gets the first name of the current contractor
     * @return The first name of the contractor
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Gets the last name of the current contractor
     * @return The last name of the contractor
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * The status of the current contractor
     * @return The status of the contractor
     */
    public String getStatus() {
        return status;
    }

    public void setAgencySource(String agencySource) {
        this.agencySource = agencySource;
    }

    /**
     * Gets all the engagement contracts for this contractor.
     * @return All the engagement contracts for this contractor.
     */
    public List<EngagementContract> getContracts(){
        return this.contracts;
    }

    /**
     * Adds an EngagementContract to this contractor.
     * @param contract The engagement contract to add to the contractor.
     */
    public void addEngagementContract(EngagementContract contract) {
        contracts.add(contract);
    }


    /**
     * Generates a List of ReportData objects for viewing contractor data in report format.
     * @param contractor The contractor to generate report data for.
     * @return A List of ReportData objects, used for viewing reports.
     */
    public static List<ReportData> generateReportData(Contractor contractor) {
        List<ReportData> allReportData = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String contractorName = contractor.firstName + " " + contractor.lastName;
        String company = contractor.agencySource;
        for (EngagementContract contract : contractor.getContracts()) {
            String costCenter = contract.getCostCenter().getLocation();
            String startDate = dateFormat.format(contract.getStartDate());
            String endDate = dateFormat.format(contract.getEndDate());
            String hiringManager = contract.getHiringManager().getFirstName() + " " + contract.getHiringManager().getLastName();

            Calendar cStart = Calendar.getInstance();
            cStart.setTime(contract.getStartDate());
            Calendar cEnd = Calendar.getInstance();
            cEnd.setTime(contract.getEndDate());

            while(cStart.before(cEnd)) {
                String workingMonth;
                String billingMonth;
                int monthlyCost = contract.getMonthlyCost();
                workingMonth = cStart.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());

                Calendar cNextMonth = Calendar.getInstance();
                cNextMonth.setTime(cStart.getTime());
                cNextMonth.add(Calendar.MONTH, 1);
                billingMonth = cNextMonth.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());

                cStart.add(Calendar.MONTH, 1);

                ReportData rp = new ReportData(contractorName, company, costCenter, workingMonth, billingMonth, monthlyCost, hiringManager, startDate, endDate);
                allReportData.add(rp);
            }
        }

        return allReportData;
    }
}
