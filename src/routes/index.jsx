import { BrowserRouter, Route, Routes } from "react-router"
import Form from "../pages/Form"
import App from "../App";
import { BookProvider } from "../context/BookContext";
import JsonForm from "../pages/FormJSON";
import DisplayUsers from "../pages/DisplayUserData";


function Path () {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/json" element={<JsonForm/>} />
          <Route path="/apps" element={<App/>} />
          <Route path="/userForm" element={<DisplayUsers/>} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  )
}

export default Path;