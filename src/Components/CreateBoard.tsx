import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, toDoState } from "../atoms";

const ModalContainer = styled.div<{ modalOnOff: boolean }>`
  display: ${(props) => (props.modalOnOff ? "none" : "block")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  min-width: 300px;
  width: 30vw;
  height: 20vh;
  border-radius: 15px;
  margin: 15% auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #888;
  box-shadow: 5px 6px 5px rgba(0, 0, 0, 0.4);
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
  i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  h2 {
    padding: 20px;
    font-weight: 500;
    font-size: 20px;
  }
  input {
    border: none;
    border-bottom: 2px solid #bbb;
    width: 100%;
    font-size: 30px;
    text-align: center;
    padding-top: 20px;
    &:focus {
      outline: none;
    }
  }
`;

function CreateBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const [modal, setModal] = useRecoilState(modalState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ board }: any) => {
    setToDos((allboards) => {
      const createBoard = {
        ...allboards,
        [board]: [],
      };
      localStorage.setItem("board", JSON.stringify(createBoard));
      return createBoard;
    });
    setValue("board", "");
    setModal(true);
  };
  const onClick = () => {
    setModal((prev) => !prev);
  };
  return (
    <ModalContainer modalOnOff={modal}>
      <ModalContent>
        <h2>새로운 보드의 이름을 입력해주세요!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("board")} type="text" />
        </form>
        <i className="fa-solid fa-x" onClick={onClick}></i>
      </ModalContent>
    </ModalContainer>
  );
}

export default CreateBoard;
