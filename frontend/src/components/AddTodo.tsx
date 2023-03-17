import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  const saveTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/todos", {
        title,
        description,
        started,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addtodo-container">
      <form
        className="addtodo-form"
        onSubmit={saveTodo}>
        <div className="addtodo-title">
          <label className="addtodo-label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title.."
            />
          </div>
        </div>
        <div className="addtodo-description">
          <label className="label">Description</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description.."
            />
          </div>
        </div>
        <button
          type="submit"
          className="button button-done">
          Save
        </button>
      </form>
    </div>
  );
};
export default AddTodo;
