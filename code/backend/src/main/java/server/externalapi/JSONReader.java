package server.externalapi;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;

/**
 * JSONReader class that parses the JSON response from external API
 */
public class JSONReader {

    /**
     * Builds a string for the full JSON response from a reader.
     * @param r The reader to read the JSON response
     * @return The full JSON response as a string
     * @throws IOException if something goes wrong whilst reading the JSON response
     */
    private static String readAll(Reader r) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = r.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    /**
     *
     * @param url The url to call and get the JSON response from
     * @return A JSONObject with all
     * @throws IOException if something goes wrong whilst parsing the response obtained from the url
     * @throws JSONException if something goes wrong whilst building the JSONObject from the response of the url
     */
    public static JSONObject readJSONFromURL(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }
}
