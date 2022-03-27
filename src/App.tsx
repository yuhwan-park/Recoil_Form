import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Borads = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`;
const Borad = styled.ul`
  padding: 20px 20px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.boardColor};
  min-width: 360px;
  box-shadow: 2px 5px 13px 0px rgb(0 0 0 / 50%);
`;
const Card = styled.li`
  padding: 10px 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;
const toDos = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Borads>
          <Droppable droppableId="one">
            {(provided) => (
              <Borad ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable draggableId={toDo} index={index}>
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
                ))}
                {provided.placeholder}
              </Borad>
            )}
          </Droppable>
        </Borads>
      </Container>
    </DragDropContext>
  );
}

export default App;
