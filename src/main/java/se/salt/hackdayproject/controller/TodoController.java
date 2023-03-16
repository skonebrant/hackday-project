package se.salt.hackdayproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.salt.hackdayproject.model.Todo;
import se.salt.hackdayproject.repository.TodoRepository;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    TodoRepository repo;

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam String title) {
        try {
            List<Todo> todos = new ArrayList<>();

            if (title == null) {
                todos.addAll(repo.findAll());
            } else {
                todos.addAll(repo.findByTitleContaining(title));
            }
            if (todos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable String id) {
        Optional<Todo> todo = repo.findById(id);
        return todo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/todos/started")
    public ResponseEntity<List<Todo>> findByStarted() {
        try {
            List<Todo> todos = repo.findByStarted(true);

            if (todos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
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
        if (todoToUpdate.isPresent()) {
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

    @DeleteMapping("/todos/")
    public ResponseEntity<Void> deleteAllTodos() {
        try {
            repo.deleteAll();
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
