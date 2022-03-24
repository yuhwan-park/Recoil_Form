import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  ToDo: string;
}

function CreateTodo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ ToDo }: IForm) => {
    if (toDos.length >= 15) {
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
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("ToDo", { required: true })} type="text" />
      <button>확인</button>
      <div>{errors.ToDo?.message}</div>
    </form>
  );
}

export default CreateTodo;
