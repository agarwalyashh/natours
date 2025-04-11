import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../services/apiAuth";
import { createContext, useContext } from "react";
import Loading from "../components/Loading";

const UserContext = createContext();

function AuthProvider({ children }) {
  const { data,isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: isLoggedIn,
  });
  console.log(data)

  if(isLoading)
    return <Loading/>
  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserContext); 
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
