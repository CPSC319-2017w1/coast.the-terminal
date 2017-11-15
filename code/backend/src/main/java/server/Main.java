package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


/**
 * Created by vaastav on 10/10/2017.
 */
@SpringBootApplication
@EnableScheduling
public class Main {
    public static void main(String args[])
    {
        SpringApplication.run(Main.class, args);
    }
}
