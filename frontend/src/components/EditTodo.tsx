import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTodoById();
  }, []);

  const getTodoById = async () => {
    const response = await axios.get(`http://localhost:8080/api/todos/${id}`);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setStarted(response.data.started);
  };

  const updateTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/todos/${id}`, {
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
    <div className="edittodo-container">
      <form
        className="edittodo-form"
        onSubmit={updateTodo}>
        <div className="edittodo-title">
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
        <div className="edittodo-description">
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
        <div className="control">
          <button
            type="submit"
            className="button button-done">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditTodo;
