import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { Router } from "./routes";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
