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

    public String getContractorName() {
        return contractorName;
    }

    public String getCompany() {
        return company;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public String getWorkingMonth() {
        return workingMonth;
    }

    public String getBillingMonth() {
        return billingMonth;
    }

    public double getTotalMonthlyCost() {
        return totalMonthlyCost;
    }

    public String getHiringManager() {
        return hiringManager;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }
}
