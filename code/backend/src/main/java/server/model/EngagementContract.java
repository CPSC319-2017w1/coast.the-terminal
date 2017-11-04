package server.model;

import java.util.Date;

public class EngagementContract {
    private String id;
    private Date startDate;
    private Date endDate;
    private String rateType;
    private String projectName;
    private String chargeType;
    private int dailyAllowance;
    private String originalDocumentation;
    private int terminationNum;
    private String contractorId;
    private String resourceId;
    private String hrPositionId;
    private String hrPayGradeId;
    private String costCenterId;
    private String reportingManagerUserId;
    private String currencyCode;
    private String mainSkillId;

    /**
     * Creates an engagement contract with the given fields.
     * @param id The contract ID.
     * @param startDate The contract startdate.
     * @param endDate The contract end date.
     * @param rateType The contract rate type.
     * @param projectName The contract's project name.
     * @param chargeType The contract's charge type.
     * @param dailyAllowance The daily allowance received for this contract.
     * @param originalDocumentation A reference to the original documentation for this contract.
     */
    public EngagementContract(String id, Date startDate, Date endDate, String rateType, String projectName, String chargeType, int dailyAllowance, String originalDocumentation) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rateType = rateType;
        this.projectName = projectName;
        this.chargeType = chargeType;
        this.dailyAllowance = dailyAllowance;
        this.originalDocumentation = originalDocumentation;
    }

    public String getId() {
        return id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getRateType() {
        return rateType;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getChargeType() {
        return chargeType;
    }

    public int getDailyAllowance() {
        return dailyAllowance;
    }

    public String getOriginalDocumentation() {
        return originalDocumentation;
    }

    public int getTerminationNum() {
        return terminationNum;
    }

    public void setTerminationNum(int terminationNum) {
        this.terminationNum = terminationNum;
    }

    public String getContractorId() {
        return contractorId;
    }

    public void setContractorId(String contractorId) {
        this.contractorId = contractorId;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getHrPositionId() {
        return hrPositionId;
    }

    public void setHrPositionId(String hrPositionId) {
        this.hrPositionId = hrPositionId;
    }

    public String getHrPayGradeId() {
        return hrPayGradeId;
    }

    public void setHrPayGradeId(String hrPayGradeId) {
        this.hrPayGradeId = hrPayGradeId;
    }

    public String getCostCenterId() {
        return costCenterId;
    }

    public void setCostCenterId(String costCenterId) {
        this.costCenterId = costCenterId;
    }

    public String getReportingManagerUserId() {
        return reportingManagerUserId;
    }

    public void setReportingManagerUserId(String reportingManagerUserId) {
        this.reportingManagerUserId = reportingManagerUserId;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getMainSkillId() {
        return mainSkillId;
    }

    public void setMainSkillId(String mainSkillId) {
        this.mainSkillId = mainSkillId;
    }
}
