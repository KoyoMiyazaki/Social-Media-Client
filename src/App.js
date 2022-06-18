import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Menubar from "./components/Menubar";

import { AuthContext } from "./context/auth";

import "./App.css";

const darkMode = createTheme({
  palette: {
    mode: "light",
  },
});

function ProtectRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }
}

function App() {
  const { user } = useContext(AuthContext);
  // console.log(context);

  return (
    <Router>
      <Menubar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
