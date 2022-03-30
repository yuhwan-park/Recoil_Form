import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCards from "./DraggableCards";
import { useState } from "react";

interface iWrapper {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Wrapper = styled.ul<iWrapper>`
  padding: 20px 20px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#c5cae9"
      : props.draggingFromThisWith
      ? "#fce4ec"
      : props.theme.boardColor};
  min-width: 360px;
  box-shadow: 2px 5px 13px 0px rgb(0 0 0 / 50%);
  height: fit-content;
  min-height: 110px;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.div`
  text-align: center;
  padding-bottom: 10px;
  font-weight: 700;
`;
const Form = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #bbb;
  padding: 10px 0px;
  i {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    color: #58a5f0;
    font-size: 30px;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #004c8c;
    }
  }
  input {
    width: 80%;
    height: 30px;
    border: none;
    border-bottom: 2px solid #58a5f0;
    &:focus {
      outline: none;
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  const [flag, setFlag] = useState(true);
  const { register, setValue, handleSubmit } = useForm();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: any) => {
    // ToDo 추가 기능
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const onClick = () => {
    setFlag((flag) => !flag);
  };
  const onBlur = () => {
    setFlag(true);
  };
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Wrapper
          isDraggingOver={snapshot.isDraggingOver} // 현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인
          draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} // 현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Form onSubmit={handleSubmit(onValid)}>
            {flag ? (
              <Title>{boardId}</Title>
            ) : (
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder="여기에 입력하세요!"
                onBlur={onBlur}
              />
            )}
            <i className="fa-solid fa-plus" onClick={onClick}></i>
          </Form>
          {toDos.map((toDo, index) => (
            <DraggableCards
              key={toDo.id}
              toDoId={toDo.id}
              toDoText={toDo.text}
              index={index}
              boardId={boardId}
            />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
