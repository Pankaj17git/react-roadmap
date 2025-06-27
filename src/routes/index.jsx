import { BrowserRouter, Route, Routes } from "react-router"
import Form from "../pages/Form"
import App from "../App";
import { BookProvider } from "../context/BookContext";


function Path () {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/apps" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  )
}

export default Path;