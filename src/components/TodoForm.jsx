import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

const TodoForm = ({ onSubmit }) => {
  // Tasks  State
  const [inputText, setInputText] = useState("");
  // error state
  const [inputErrors, setInputErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });
  //state changes
  const handleChange = (e) => {
    setInputText(e.target.value);
    setInputErrors(validate(inputText));
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors(validate(inputText));
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: inputText,
      completed: false,
    });
    setInputText(" ");
    // console.log("submitted");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
      // console.log("enter key");
    }
  };
  // validation input text
  const validate = (text) => {
    const errors = {};

    // if (!text.trim()) {
    //   errors.text = "Task is required";
    // } else
    if (text.length < 10) {
      errors.text = "Task must be more than 10 characters";
    }
    return errors;
  };
  // useEffect(() => {
  //   if (Object.keys(inputErrors).length === 0 && inputText.length > 10) {
  //     console.log(inputText);
  //   }
  // }, [inputErrors, inputText]);

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/*  input text  */}
      <input
        placeholder="What needs to be done?"
        value={inputText}
        onChange={handleChange}
        onKeyPress={handleKeypress}
        name="text"
        className="todo-input"
        ref={inputRef}
      />
      {/*  icon for input text  */}
      <FontAwesomeIcon className="icon-inside" icon={faChevronDown} />
      {/* show error msg if input text validation failed */}
      {inputErrors.text && <p style={{ color: "red" }}>{inputErrors.text}</p>}
    </form>
  );
};

export default TodoForm;
