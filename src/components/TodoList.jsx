import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import data from "../data/data.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodoList = () => {
  // Tasks  State
  const [todos, setTodos] = useState(data);
  // status state
  const [status, setStatus] = useState("all");
  // filter state
  const [filteredTodos, setFilteredTodos] = useState([]);

  // filter status all, active and completed
  const handleFilter = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "active":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // Add task
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    // console.log(...todos);
  };

  // Delete task
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
    toast.success("The  data successfully deleted", { autoClose: 1000 });
  };
  // Mark task as done or completed
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Change task  status
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  //Save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  // one time changes
  useEffect(() => {
    getLocalTodos();
  }, []);

  //run every todo and status changes
  useEffect(() => {
    handleFilter();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <>
      <TodoForm onSubmit={addTodo} />
      {/* Display ToDos */}
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        filteredTodos={filteredTodos}
        handleStatus={handleStatus}
        status={status}
      />
    </>
  );
};
