import { BrowserRouter, Route, Routes } from "react-router"
import Form from "../pages/Form"
import App from "../App";
import { BookProvider } from "../context/BookContext";
import JsonForm from "../pages/FormJSON";
import DisplayUsers from "../pages/DisplayUserData";
import { UserContextProvider } from "../context/UserContext";


function Path () {
  return (
    <UserContextProvider>
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
    </UserContextProvider>
    
  )
}

export default Path;