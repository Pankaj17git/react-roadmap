import { createContext, useContext } from "react";
import useBookStorage from "../hooks/useBookStorage";

const BookContext = createContext();

const BookProvider = ({children}) => {
  const bookStorage = useBookStorage()

  return (
    <BookContext value={bookStorage}>
      {children}
    </BookContext>
  )
}

const useBook = () => useContext(BookContext)

// eslint-disable-next-line react-refresh/only-export-components
export {BookProvider, useBook};