package models;


import org.ektorp.CouchDbConnector;
import org.ektorp.CouchDbInstance;
import org.ektorp.http.HttpClient;
import org.ektorp.http.StdHttpClient;
import org.ektorp.impl.StdCouchDbConnector;
import org.ektorp.impl.StdCouchDbInstance;
import play.Play;

public class Database {

    private final String name = Play.configuration.getProperty("couchdb.name");
    private String url = Play.configuration.getProperty("couchdb.url");
    private Integer port = 0;

    private CouchDbConnector db;

    public CouchDbConnector getDB() {
        return this.db;
    }


    public Database() {

        System.out.println("instantiating DB");

        try {
            this.port = Integer.parseInt(Play.configuration.getProperty("couchdb.port"));
        }
        catch(Exception e) {
            this.port = 0;
        }

        HttpClient httpClient;

        if (this.port != 0) {
            httpClient = new StdHttpClient.Builder()
                                    .host(this.url)
                                    .port(this.port)
                                    .build();
        }
        else {
            httpClient = new StdHttpClient.Builder()
                                    .host(this.url)
                                    .username(Play.configuration.getProperty("couchdb.userid"))
                                    .password(Play.configuration.getProperty("couchdb.password"))
                                    .build();
        }

        CouchDbInstance dbInstance = new StdCouchDbInstance(httpClient);
        this.db = new StdCouchDbConnector(this.name, dbInstance);
        this.db.createDatabaseIfNotExists();
    }

}