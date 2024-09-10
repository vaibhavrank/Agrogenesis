import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import  Login  from "./Pages/Login";
import Register from "./Pages/Register";
import BookAppointment from "./Components/BookAppointment";
import Service from "./Pages/Service";
import SoilDataForm from "./Components/SoilFrom";
import Reviews from "./Components/Reviews";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path = "AgriGenesis" element={<Home/>} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login /> } />
          <Route path="*" element={<NotFound />} />
          <Route path='/register' element={<Register/>} />
          <Route path="/review" element={<Reviews/>} />
          {/* <Route path="/expert" element={<Farm/>} /> */}
          <Route path="/appointment" element={<Appointment/>} />

          <Route path="/bookappointment" element={<BookAppointment/>} /> 
          <Route path="/soilform" element={<SoilDataForm/>} />  
          <Route path="/service" element={<Service/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;