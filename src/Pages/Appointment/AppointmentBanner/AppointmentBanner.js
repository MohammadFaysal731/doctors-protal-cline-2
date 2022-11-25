import React from 'react';
import { DayPicker } from "react-day-picker";
import bg from "../../../assets/images/bg.png";
import chair from '../../../assets/images/chair.png';
const AppointmentBanner = ({date,setDate}) => {
  
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ background: `url(${bg})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="">
            <img
              src={chair}
              className="lg:max-w-sm rounded-lg shadow-2xl"
              alt="Dentist Chair"
            />
          </div>
          <div>
            <DayPicker
              className=""
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentBanner;