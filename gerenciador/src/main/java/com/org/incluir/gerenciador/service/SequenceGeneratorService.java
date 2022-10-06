package com.org.incluir.gerenciador.service;

import java.util.Objects;

import com.org.incluir.gerenciador.model.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {
    private MongoOperations mongoOperations;

    @Autowired
    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public long generateSequence(String seqName) {
        Query query = new Query(Criteria.where("_id").is(seqName));
        Update update = new Update().inc("seq", 1);

        DatabaseSequence counter = mongoOperations.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true).upsert(true), DatabaseSequence.class);

        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
