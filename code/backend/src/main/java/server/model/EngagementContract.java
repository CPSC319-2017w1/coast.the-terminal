package server.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
    private CostCenter costCenter;
    private String currencyCode;
    private int timeMaterialTerms;
    private int poRefNum;
    private int dollarRate;
    private HRPositionRole hrPositionRole;
    private HRPayGrade hrPayGrade;
    private Skill mainSkill;
    private boolean rehire;
    private HiringManager hiringManager;


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
    public EngagementContract(String id,
                              Date startDate,
                              Date endDate,
                              String rateType,
                              String projectName,
                              String chargeType,
                              int dailyAllowance,
                              String originalDocumentation,
                              int terminationNum,
                              CostCenter costCenter,
                              String currencyCode,
                              int timeMaterialTerms,
                              int poRefNum,
                              int dollarRate,
                              HRPositionRole hrPositionRole,
                              HRPayGrade hrPayGrade,
                              Skill mainSkill,
                              boolean rehire,
                              HiringManager hiringManager) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rateType = rateType;
        this.projectName = projectName;
        this.chargeType = chargeType;
        this.dailyAllowance = dailyAllowance;
        this.originalDocumentation = originalDocumentation;
        this.terminationNum = terminationNum;
        this.costCenter = costCenter;
        this.currencyCode = currencyCode;
        this.timeMaterialTerms = timeMaterialTerms;
        this.poRefNum = poRefNum;
        this.dollarRate = dollarRate;
        this.hrPositionRole = hrPositionRole;
        this.hrPayGrade = hrPayGrade;
        this.mainSkill = mainSkill;
        this.rehire = rehire;
        this.hiringManager = hiringManager;
    }

    /**
     * Gets the estimated monthly cost for this month of the engagement contract
     * @return The estimated monthly cost for this engagement contract.
     */
    public int getMonthlyCost() {
        final int HOURS_IN_DAY = 8;
        final int DAYS_IN_MONTH = 22;
        int multiplier = 1;
        int totalMonthlyCost = this.dollarRate;

        switch (this.rateType) {
            case "hourly":
                multiplier =  HOURS_IN_DAY * DAYS_IN_MONTH;
                break;
            case "daily":
                multiplier = DAYS_IN_MONTH;
                break;
        }

        return totalMonthlyCost * multiplier;
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

    public CostCenter getCostCenter() {
        return costCenter;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public int getTimeMaterialTerms() {
        return timeMaterialTerms;
    }

    public int getPoRefNum() {
        return poRefNum;
    }

    public int getDollarRate() {
        return dollarRate;
    }

    public HRPositionRole getHrPositionRole() {
        return hrPositionRole;
    }

    public HRPayGrade getHrPayGrade() {
        return hrPayGrade;
    }

    public Skill getMainSkill() {
        return mainSkill;
    }

    public boolean isRehire() {
        return rehire;
    }

    public HiringManager getHiringManager() { return hiringManager; }
}