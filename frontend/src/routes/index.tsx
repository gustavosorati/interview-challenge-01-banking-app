import { ReactNode, useContext } from "react";
import { Navigate, Route, Routes  } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DefaultLayout } from "../layout";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";





export function Router() {
  const {isLogged} = useContext(AuthContext);
  
  return(
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    </Routes>  
  )
}