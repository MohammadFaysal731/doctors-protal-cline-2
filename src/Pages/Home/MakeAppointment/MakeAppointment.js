import React from 'react';
import appointment from "../../../assets/images/appointment.png";
import doctor from '../../../assets/images/doctor-small.png';
import PrimaryButton from '../../Shared/PrimaryButton/PrimaryButton';
const MakeAppointment = () => {
  return (
    <section
      className="flex rounded-xl"
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className="flex-1 justify-center items-center hidden lg:block">
        <img src={doctor} alt="" className="mt-[-80px]"/>
      </div>
      <div className="flex-1 text-white p-10">
        <h3 className="text-2xl text-primary font-bold">Appointment</h3>
        <h2 className="text-3xl ">Make an Appointment Today</h2>
        <p className='py-5'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, ipsa
          iusto excepturi ab eum eos sit optio pariatur, reiciendis
          exercitationem est? Debitis sed vero repellendus rerum, optio et error
          inventore atque ipsam enim distinctio modi labore impedit deserunt
          odit soluta quasi ullam in, eum cupiditate non incidunt. Suscipit, in
          fuga.
        </p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default MakeAppointment;