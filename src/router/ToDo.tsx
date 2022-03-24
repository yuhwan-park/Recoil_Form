import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateTodo from "../components/CreateToDo";

function ToDo() {
  const ToDos = useRecoilValue(toDoState);
  return (
    <>
      <h1>To Do List</h1>
      <hr />
      <CreateTodo />
      <ul>
        {ToDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default ToDo;
