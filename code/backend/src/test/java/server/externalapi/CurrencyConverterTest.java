package server.externalapi;

import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertTrue;

/**
 * Created by vaast on 15/11/2017.
 */
public class CurrencyConverterTest {

    @Test
    void getRateTest() {
        double rate = CurrencyConverter.getRate("CAD", "USD", 0.0);
        assertTrue(rate > 0.0);
    }

    @Test
    void getRateTestFailure() {
        double rate = CurrencyConverter.getRate("ABC", "DEF", 0.0);
        assertTrue(rate == 0.0);
    }
}
