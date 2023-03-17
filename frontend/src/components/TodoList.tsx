/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ITodo from "../todo.type";

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await axios.get("http://localhost:8080/api/todos");
    setTodos(response.data);
  };

  const deleteTodos = async (todoId: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${todoId}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-button-container">
        <Link
          to="add"
          className="button button-to-add">
          Add a new to-do!
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
