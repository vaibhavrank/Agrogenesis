import React from "react";
import AppointmentForm from "../Components/AppointmentForm";
import Navbar from "../Components/Navbar";

function Appointment() {
  return <div className="appointment-section">
    <Navbar />
    <AppointmentForm />
  </div>;
}

export default Appointment;
