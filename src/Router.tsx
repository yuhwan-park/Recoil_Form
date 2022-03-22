import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./router/Form";
import ToDoList from "./router/ToDo";

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
