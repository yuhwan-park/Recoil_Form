import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCards from "./Components/DraggableCards";

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

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    setToDos((toDo) => {
      const copyToDos = [...toDo];
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Borads>
          <Droppable droppableId="one">
            {(provided) => (
              <Borad ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCards key={toDo} toDo={toDo} index={index} />
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
