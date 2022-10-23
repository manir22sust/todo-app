import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer } from "react-toastify";

const Todo = ({
  completeTodo,
  removeTodo,
  filteredTodos,
  handleStatus,
  status,
}) => {
  return (
    <div>
      {/* Data displayed in a table */}
      <div className="table">
        <table>
          <tbody>
            {filteredTodos.map((todo, index) => {
              return (
                <tr
                  className={todo.completed ? "todo-row complete" : "todo-row"}
                  key={index}
                >
                  <td
                    className="todoCircle"
                    onClick={() => completeTodo(todo.id)}
                  >
                    {/*  if task is completed show check */}
                    <FontAwesomeIcon
                      className={todo.completed ? "hide" : "done"}
                      onClick={() => completeTodo(todo.id)}
                      icon={faCheck}
                    />
                  </td>
                  {/*  task show in table  */}
                  <td className="todos" onClick={() => completeTodo(todo.id)}>
                    {" "}
                    {todo.text}
                  </td>
                  {/* delete icon and can be data deleted */}
                  <td
                    className={`${index !== 0 ? "icons" : "icon"} `}
                    onClick={() => removeTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />

                    <ToastContainer />
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* filter button  All, Active and completed */}
          <tfoot className="footer">
            <tr className="bottom">
              <td>
                <button type="button" className="btn toggle-btn">{`${
                  filteredTodos.length
                } ${
                  filteredTodos.length !== 1 ? "items" : "item"
                } left`}</button>
                <button
                  className="btn toggle-btn"
                  onClick={handleStatus}
                  type="button"
                  value="all"
                  aria-pressed={status === "all"}
                >
                  All
                </button>
                <button
                  className="btn toggle-btn"
                  onClick={handleStatus}
                  type="button"
                  value="active"
                  aria-pressed={status === "active"}
                >
                  Active
                </button>
                <button
                  className="btn toggle-btn"
                  onClick={handleStatus}
                  type="button"
                  value="completed"
                  aria-pressed={status === "completed"}
                >
                  Completed
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Todo;
