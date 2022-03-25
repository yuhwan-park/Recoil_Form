import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateTodo from "../components/CreateToDo";
import ToDo from "../components/ToDo";

function ToDoList() {
  const selectorOutput = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  return (
    <>
      <h1>To Do List</h1>
      <Link to={"/signup"}>
        <button>Sign Up</button>
      </Link>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
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
