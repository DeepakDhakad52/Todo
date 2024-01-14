import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateTask from "./components/Profile";
import Login from "./components/auth/Login";
import './index.css'
import { useContext, useEffect } from "react";
import axios from 'axios';
import { Context } from ".";
import Register from "./components/auth/Register";


function App() {
  const { setIsAuth } = useContext(Context);
  useEffect(() => {
    try {
      axios.post('http://localhost:5001/login', {}, {
        withCredentials: true
      })
        .then(response => {
          if (response.data.success) {
            setIsAuth(true);
          }
        })
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error);
    }
  }, [setIsAuth])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<CreateTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
