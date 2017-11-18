package server.tasks;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import server.model.Login;
import server.session.AuthenticationController;

import java.util.ArrayList;

/**
 * Created by vaast on 17/11/2017.
 */
@Component
public class UpdateSessionStatusTask {

    long maxDuration = 60 * 60 * 1000;

    @Scheduled(fixedDelay = 36000000, initialDelay = 36000000)
    public void updateSessions() {
        ArrayList<Login> logins = AuthenticationController.getLogins();
        for (Login l : logins) {
            if (l.isExpired(maxDuration)) {
                AuthenticationController.logout(l.getUsername());
            }
        }
    }
}
