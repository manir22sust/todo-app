import "./App.css";
import { TodoList } from "./components/TodoList";
function App() {
  return (
    <div className="App">
      <div className="todo-app">
        <h1 style={{ fontSize: "50px", color: "rgb(163, 60, 60)" }}>todos</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
