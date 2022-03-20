import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 25vh;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  input {
    margin: 10px;
  }
`;

function Form() {
  // register = 인풋안에 넣음으로 인해 onSubmit 설정과 setState 할 필요가 없어짐
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {};
  console.log(formState.errors, formState.submitCount);
  return (
    <Container>
      <SignUpForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("name", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="name"
        />
        <input
          {...register("password", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="password"
        />
        <input
          {...register("password_comfirm", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="password_comfirm"
        />
        <input
          {...register("phone", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="phone"
        />
        <input
          {...register("first_resident_num", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="first_resident_num"
        />
        <input
          {...register("second_resident_num", { required: "필수 항목입니다!" })}
          type="text"
          placeholder="second_resident_num"
        />
        <button>Sign Up</button>
      </SignUpForm>
    </Container>
  );
}

export default Form;
