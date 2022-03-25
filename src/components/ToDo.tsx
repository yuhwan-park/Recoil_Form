import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      // 버튼 클릭 시 카테고리가 바뀌는 기능
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text,
        id,
        category: name as IToDo["category"],
      };
      const newToDos = [...oldToDos]; // state를 mutate하지 않기 위해 배열을 얕은 복제한 뒤 splice
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };
  return (
    <li>
      {text}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
