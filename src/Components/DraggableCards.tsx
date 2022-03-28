import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li`
  padding: 10px 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;
interface IDraggableCardsProps {
  toDo: string;
  index: number;
}

function DraggableCards({ toDo, index }: IDraggableCardsProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCards);
