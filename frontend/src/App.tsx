import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <BrowserRouter>
      <main>
        <section className="container">
          <Routes>
            <Route
              path="/"
              element={<TodoList />}
            />
            <Route
              path="add"
              element={<AddTodo />}
            />
            <Route
              path="edit/:id"
              element={<EditTodo />}
            />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
