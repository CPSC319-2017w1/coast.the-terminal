import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.fail;


class MainTest {
    @Test
    void main() {
        String[] args = new String[5];
        try {
            Main.main(args);

        } catch(Exception e) {
            fail("Exception thrown in main.");
        }
    }
}