import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCards from "./DraggableCards";

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
  border-bottom: 1px solid lightgray;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Wrapper
          isDraggingOver={snapshot.isDraggingOver} // 현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인
          draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} // 현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Title>{boardId}</Title>
          {toDos.map((toDo, index) => (
            <DraggableCards key={toDo} toDo={toDo} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
