import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, toDoState } from "./atoms";
import Board from "./Components/Board";
import CreateBoard from "./Components/CreateBoard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  > i {
    position: absolute;
    top: 50px;
    right: 50px;
    cursor: pointer;
    font-size: 50px;
    color: #bbb;
    z-index: 9999;
  }
`;
const Boards = styled.div`
  display: flex;
  position: absolute;
  flex-wrap: wrap;
  top: 20px;
  left: 20px;
  width: 90vw;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setModal = useSetRecoilState(modalState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((boards) => {
        const boardCopy = [...boards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        const newBoard = {
          ...boards,
          [source.droppableId]: boardCopy,
        };
        localStorage.setItem("board", JSON.stringify(newBoard));
        return newBoard;
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
        const newBoard = {
          ...borads,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        localStorage.setItem("board", JSON.stringify(newBoard));
        return newBoard;
      });
    }
  };
  const onClick = () => {
    setModal((prev) => !prev);
  };
  useEffect(() => {
    const storage = localStorage.getItem("board");
    if (storage !== null) {
      const parsedData = JSON.parse(storage);
      setToDos(parsedData);
    }
  }, [setToDos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <i className="fa-solid fa-circle-plus" onClick={onClick}></i>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} toDos={toDos[boardId]} key={boardId} />
          ))}
        </Boards>
        <CreateBoard />
      </Container>
    </DragDropContext>
  );
}

export default App;

