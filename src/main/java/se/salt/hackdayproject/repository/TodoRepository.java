package se.salt.hackdayproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import se.salt.hackdayproject.model.Todo;

import java.util.List;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findByTitleContaining(String title);
    List<Todo> findByStarted(boolean started);
}
