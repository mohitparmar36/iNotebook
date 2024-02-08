import "./App.css";
import NoteState from "./context/notes/NoteState.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Alert from "./components/Alert.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import { useState } from "react";

function App() {
  const showAlert= (message,type)=>{
    setAlert({
      msg : message,
      typ : type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const [alert,setAlert] = useState(null);
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
