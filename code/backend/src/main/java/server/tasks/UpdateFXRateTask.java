package server.tasks;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import server.externalapi.CurrencyConverter;


/**
 * Automated task to update the FXRates stored in the Database
 */
@Component
public class UpdateFXRateTask {

    /**
     * Schedules a task to update the FXRate table at 3AM every morning
     */
    @Scheduled(fixedDelay = 36000000, initialDelay = 10000)
    public void updateFXRates() {
        System.out.println("Updating Rates now");
        CurrencyConverter.updateRates();
    }
}
