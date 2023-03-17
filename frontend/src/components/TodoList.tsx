/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ITodo from "../todo.type";

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await fetch("http://localhost:8080/api/todos");
    const json = (await response.json()) as ITodo[];
    setTodos(json);
  };

  const deleteTodos = async (todoId: string) => {
    const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
      method: "DELETE",
    });
    getTodos();
  };

  return (
    <div>
      <Link
        to="add"
        className="button is-success">
        Add New
      </Link>
      {todos.map((todo) => (
        <div key={todo.id}>
          <ul>
            <li>{todo.title}</li>
            <li>{todo.description}</li>
          </ul>
          <Link
            to={`edit/${todo.id}`}
            className="button is-info is-small mr-1">
            Edit
          </Link>
          <button
            onClick={() => deleteTodos(todo.id)}
            className="button is-danger is-small">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default TodoList;
