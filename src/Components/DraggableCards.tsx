import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.li`
  padding: 10px 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

const CardWrapper = styled.div`
  display: flex;
  position: relative;
  i {
    position: absolute;
    top: 20px;
    right: 10px;
    color: #bbb;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: black;
    }
  }
  li {
    width: 100%;
  }
`;
interface IDraggableCardsProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCards({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardsProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = () => {
    setToDos((boards) => {
      // ToDo 삭제기능
      const boardCopy = [...boards[boardId]];
      boardCopy.splice(index, 1);
      return {
        ...boards,
        [boardId]: boardCopy,
      };
    });
  };
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided) => (
        <CardWrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Card {...provided.dragHandleProps}>{toDoText}</Card>
          <i onClick={onClick} className="fa-solid fa-trash"></i>
        </CardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCards);
