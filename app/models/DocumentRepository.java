package models;

import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.support.CouchDbRepositorySupport;
import org.ektorp.support.GenerateView;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DocumentRepository extends CouchDbRepositorySupport<DocumentEntity> {


        public DocumentRepository(CouchDbConnector db) {
                super(DocumentEntity.class, db);
                //initStandardDesignDocument();
        }

        @GenerateView @Override
        public List<DocumentEntity> getAll() {
                ViewQuery q = createQuery("all").descending(true);
                return db.queryView(q, DocumentEntity.class);
        }
        
        @GenerateView
        public List<DocumentEntity> findByTag(String tag) {
                return queryView("by_tag", tag);
        }

}