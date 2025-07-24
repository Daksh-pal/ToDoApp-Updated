import "./App.css";
import Landing from "./Components/Landing.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AddTask from "./Components/AddTask.jsx";
import AllTasks from "./Components/AllTasks.jsx";
import UpdateTask from "./Components/UpdateTask.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/allTasks" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/allTasks" /> : <Register />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/allTasks" /> : <Landing />}
        />
        <Route
          path="/addtask"
          element={token ? <AddTask /> : <Navigate to="/login" />}
        />
        <Route path="/allTasks" element={<AllTasks />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
