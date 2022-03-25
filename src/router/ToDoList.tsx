import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateTodo from "../components/CreateToDo";
import ToDo from "../components/ToDo";

function ToDoList() {
  const selectorOutput = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };
  return (
    <>
      <h1>To Do List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateTodo />
      <ul>
        {selectorOutput.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
