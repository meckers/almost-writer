package models;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.ektorp.support.CouchDbDocument;

import java.util.Date;

public class DocumentEntity extends CouchDbDocument {

    private static final long serialVersionUID = 1L;
    private String type;
    private String id;
    private String name;
    private Object value;
    private Date date;


    @JsonIgnore
    private String _deleted_conflicts;

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Object getValue() {
        return this.value;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return this.date;
    }

    public DocumentEntity(String type, String name, Object value) {
        this.type = type;
        this.name = name;
        this.value = value;
        this.date = new Date();
    }


}
