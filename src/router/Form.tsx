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
  width: 500px;
  input {
    margin: 10px;
  }
  span {
    font-size: 10px;
    position: relative;
    left: 8px;
    color: red;
    margin-bottom: 5px;
  }
  label {
    color: white;
    font-size: 12px;
  }
  button {
    border: none;
    background-color: powderblue;
    color: white;
    font-weight: 600;
  }
`;
interface IForm {
  name: string;
  password: string;
  password_confirm: string;
  phone: string;
}

function Form() {
  // register = 인풋안에 넣음으로 인해 onSubmit 설정과 setState 할 필요가 없어짐
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.password_confirm) {
      setError(
        "password_confirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
    }
  };
  return (
    <Container>
      <SignUpForm onSubmit={handleSubmit(onValid)}>
        <label htmlFor="name">이름</label>
        <input
          {...register("name", { required: "필수 항목입니다!" })}
          type="text"
          id="name"
        />
        <span>{errors?.name?.message}</span>
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", {
            required: "필수 항목입니다!",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상 입력해주세요",
            },
          })}
          type="text"
          id="password"
        />
        <span>{errors?.password?.message}</span>
        <label htmlFor="password">비밀번호 확인</label>
        <input
          {...register("password_confirm", { required: "필수 항목입니다!" })}
          type="text"
          id="password_confirm"
        />
        <span>{errors?.password_confirm?.message}</span>
        <label htmlFor="phone">휴대폰 번호</label>
        <input
          {...register("phone", {
            required: "필수 항목입니다!",
            pattern: {
              value: /010\d{8,8}/,
              message:
                "010으로 시작하는 휴대폰 번호를 하이픈(-) 없이 적어주세요. (총 11자리)",
            },
          })}
          type="text"
          id="phone"
        />
        <span>{errors?.phone?.message}</span>
        <button>Sign Up</button>
      </SignUpForm>
    </Container>
  );
}

export default Form;
