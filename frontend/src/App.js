import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import './index.css'
import { useContext, useEffect } from "react";
import axios from 'axios';
import { Context } from ".";
import Register from "./components/auth/Register";


function App() {
  const { isAuth, setIsAuth } = useContext(Context);
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
    console.clear();
  }, [setIsAuth])
  return (
    <Router>
      <Navbar />
      <Routes>
        {
          isAuth ? <Route path="/" element={<Home />} />
          : <Route path="/" element={<Login />} />
        }
        {
          isAuth ? <Route path="/profile" element={<Profile />} />
          : <Route path="/profile" element={<Login />} />
        }
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
