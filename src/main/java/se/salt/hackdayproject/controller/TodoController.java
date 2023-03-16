package se.salt.hackdayproject.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.salt.hackdayproject.model.Todo;
import se.salt.hackdayproject.repository.TodoRepository;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    TodoRepository repo;

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable String id) {
        return ResponseEntity.ok(repo.findById(id).orElse(null));
    }

    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        URI location = URI.create("http://localhost:27014/" + todo.getId());
        Todo saved = repo.save(new Todo(todo.getTitle(), todo.getDescription(), false));
        return ResponseEntity.created(location).body(saved);
    }

    @PostMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todo) {
        Optional<Todo> todoToUpdate = repo.findById(id);
        if(todoToUpdate.isPresent()) {
            Todo toReturn = todoToUpdate.get();
            toReturn.setTitle(todo.getTitle());
            toReturn.setDescription(todo.getDescription());
            toReturn.setStarted(todo.isStarted());
            return ResponseEntity.ok(repo.save(toReturn));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String id) {
        try {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
