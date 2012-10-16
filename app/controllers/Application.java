package controllers;
import models.DocumentEntity;
import models.DocumentService;
import play.mvc.Controller;

import java.util.UUID;

public class Application extends Controller {

    public static void index() {
        render();
    }

    public static void save(String strokes) {
        DocumentEntity doc = new DocumentEntity("writer-document", "test", strokes);
        String uuid = UUID.randomUUID().toString().substring(0,8);
        doc.setId(uuid);
        DocumentService.updateDocument(doc);
        //redirect("/load/" + uuid);
        renderText(uuid);
    }

    public static void load(String uuid) {
        DocumentEntity doc = DocumentService.getDocument(uuid);
        String strokes = doc.getValue().toString();
        renderTemplate("/Application/index.html", strokes);
        //renderJSON(doc.getValue());
    }

}