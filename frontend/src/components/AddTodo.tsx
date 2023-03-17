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
      <form onSubmit={saveTodo}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className="button button-done">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddTodo;
