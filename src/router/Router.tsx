import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Form";
import ToDo from "./ToDo";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/signUp" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
