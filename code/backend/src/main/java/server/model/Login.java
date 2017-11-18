package server.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by vaast on 17/11/2017.
 */
public class Login {
    String username;
    String token;
    String timestamp;

    public Login(String username, String token, String timestamp) {
        this.timestamp = timestamp;
        this.username = username;
        this.token = token;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public boolean isExpired(long maxDuration) {
        boolean result = false;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date d = sdf.parse(this.timestamp);
            Date d2 = new Date();
            if ((d2.getTime() - d.getTime()) >= maxDuration) {
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }
}
