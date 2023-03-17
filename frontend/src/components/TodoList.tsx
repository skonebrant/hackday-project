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
    <>
      <div className="add-button-container">
        <Link
          to="add"
          className="button button is-success">
          Add New
        </Link>
      </div>
      <article className="todolist-container">
        {todos.map((todo) => (
          <div
            className="todolist-card"
            key={todo.id}>
            <ul>
              <li>
                <h3>{todo.title}</h3>
              </li>
              <li>{todo.description}</li>
            </ul>
            <div className="todolist-button-container">
              <Link
                to={`edit/${todo.id}`}
                className="button button-edit">
                Edit
              </Link>
              <button
                onClick={() => deleteTodos(todo.id)}
                className="button button-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </article>
    </>
  );
};
export default TodoList;
