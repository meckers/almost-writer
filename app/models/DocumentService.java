package models;

import org.ektorp.ViewQuery;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Magnus
 * Date: 6/1/12
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */
public class DocumentService {

    protected static final Database db = new Database();

    public static void updateDocument(DocumentEntity document) {
        new DocumentRepository(db.getDB()).update(document);
    }

    public static DocumentEntity getDocument(String id) {
        DocumentEntity document = db.getDB().get(DocumentEntity.class, id);
        return document;
    }

    public static List<DocumentEntity> getDocuments(String viewName) {
        ViewQuery v = new ViewQuery().designDocId("_design/DocumentEntity").viewName(viewName);
        List<DocumentEntity> documents = db.getDB().queryView(v, DocumentEntity.class);
        return documents;
    }

    public static void deleteDocument(DocumentEntity document) {
        db.getDB().delete(document);
    }

}
