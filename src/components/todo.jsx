import React, { useState, useRef, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTodo();
    } else {
      addTodo();
    }
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo("");
    }
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setTodo(todos[index].text);
    inputRef.current.focus();
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((item, index) =>
      index === currentTodoIndex ? { ...item, text: todo } : item
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setTodo("");
    setCurrentTodoIndex(null);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const completeTodo = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={handleSubmit}>
        <h1>ToDo App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={todo}
            ref={inputRef}
            placeholder="Enter Your Todo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{isEditing ? "Update" : "Add "}</button>
        </div>
      </form>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              {todo.text}
              <span className="icons">
                <i
                  className="bi bi-pencil-square"
                  title="Edit"
                  onClick={() => startEditing(index)}
                ></i>
                <i
                  className="bi bi-trash3-fill"
                  title="Delete"
                  onClick={() => deleteTodo(index)}
                ></i>
                <i
                  className="bi bi-check-lg"
                  title="Complete"
                  onClick={() => completeTodo(index)}
                ></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
