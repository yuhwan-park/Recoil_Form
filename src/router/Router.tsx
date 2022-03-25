import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Form";
import ToDoList from "./ToDoList";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/signUp" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
