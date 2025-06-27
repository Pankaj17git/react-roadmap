import { BrowserRouter, Route, Routes } from "react-router"
import Form from "../pages/Form"
import App from "../App";


function Path () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/apps" element={<App/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Path;