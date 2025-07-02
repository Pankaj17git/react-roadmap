import { createContext, useContext } from "react";
import useUserStorage from "../hooks/useUserStorage";


const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const userStorage = useUserStorage()

  return (
    <UserContext value={userStorage}>
      {children}
    </UserContext>
  )
}

const useUser = () => useContext(UserContext)

// eslint-disable-next-line react-refresh/only-export-components
export { UserContextProvider, useUser };