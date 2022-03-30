import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Borads = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  position: absolute;
  top: 20px;
  left: 20px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((boards) => {
        const boardCopy = [...boards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...boards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((borads) => {
        const sourceBoard = [...borads[source.droppableId]];
        const destinationBoard = [...borads[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...borads,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Borads>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} toDos={toDos[boardId]} key={boardId} />
          ))}
        </Borads>
      </Container>
    </DragDropContext>
  );
}

export default App;
