import { BrowserRouter, Route, Routes } from "react-router"
import Form from "../pages/Form"
import App from "../App";
import { BookProvider } from "../context/BookContext";
import JsonForm from "../pages/FormJSON";


function Path () {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/json" element={<JsonForm/>} />
          <Route path="/apps" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  )
}

export default Path;