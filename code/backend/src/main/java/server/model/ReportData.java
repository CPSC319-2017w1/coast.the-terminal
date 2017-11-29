package server.model;

public class ReportData {
    private String contractorName;
    private String company;
    private String costCenter;
    private String workingMonth;
    private String billingMonth;
    private double totalMonthlyCost;
    private String hiringManager;
    private String startDate;
    private String endDate;

    /**
     * Creates a ReportData object
     * @param contractorName The Contractor name
     * @param company The company name
     * @param costCenter The cost center location
     * @param workingMonth The working month
     * @param billingMonth The billing month
     * @param totalMonthlyCost The estimated total monthly cost
     * @param hiringManager The hiring manager's name
     * @param startDate The start date of the contract
     * @param endDate The end date of the contract
     */
    public ReportData(String contractorName,
                      String company,
                      String costCenter,
                      String workingMonth,
                      String billingMonth,
                      int totalMonthlyCost,
                      String hiringManager,
                      String startDate,
                      String endDate) {
        this.contractorName = contractorName;
        this.company = company;
        this.costCenter = costCenter;
        this.workingMonth = workingMonth;
        this.billingMonth = billingMonth;
        this.totalMonthlyCost = totalMonthlyCost;
        this.hiringManager = hiringManager;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * Gets the contractor's name for this report data.
     * @return The contractor's name.
     */
    public String getContractorName() {
        return contractorName;
    }

    /**
     * Gets the company for this report data.
     * @return The company name.
     */
    public String getCompany() {
        return company;
    }
    /**
     * Gets the cost center location for this report data.
     * @return The cost center location.
     */
    public String getCostCenter() {
        return costCenter;
    }

    /**
     * Gets the working month for this report data.
     * @return The working month.
     */
    public String getWorkingMonth() {
        return workingMonth;
    }

    /**
     * Gets the billing month for this report data.
     * @return The billing month.
     */
    public String getBillingMonth() {
        return billingMonth;
    }

    /**
     * Gets the total monthly cost for this report data.
     * @return The total monthly cost.
     */
    public double getTotalMonthlyCost() {
        return totalMonthlyCost;
    }

    /**
     * Gets the hiring manager's name for this report data.
     * @return The hiring manager's name.
     */
    public String getHiringManager() {
        return hiringManager;
    }

    /**
     * Get's the start date for this report data.
     * @return The start date for this report data.
     */
    public String getStartDate() {
        return startDate;
    }

    /**
     * Gets the end date for this report data.
     * @return The end date for this report data.
     */
    public String getEndDate() {
        return endDate;
    }
}
