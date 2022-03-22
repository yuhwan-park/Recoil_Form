import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  ToDo: string;
}
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ ToDo }: IForm) => {
    if (ToDos.length >= 15) {
      setError("ToDo", { message: "너무 많은 할일은 자신을 지치게 합니다!" });
      return; // 너무 많은 할일은 버그를 일으키므로 사전에 방지
    }
    setToDos((prevToDos) => [
      ...prevToDos,
      { text: ToDo, id: Date.now(), category: "TO_DO" },
    ]); // atom의 default는 array고 atom 도 IToDo[] 형식의 array기 때문에 spread 연산자로 적기
    setValue("ToDo", ""); // 인풋 비우기
  };
  return (
    <>
      <h1>To Do List</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("ToDo", { required: true })} type="text" />
        <button>확인</button>
        <div>{errors.ToDo?.message}</div>
      </form>
      <ul>
        {ToDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
