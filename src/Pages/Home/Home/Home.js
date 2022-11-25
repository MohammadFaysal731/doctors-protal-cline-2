import React from 'react';
import ContactUs from '../../Contact/Contact';
import Info from '../../Info/Info';
import Banner from '../Banner/Banner';
import ExcePtional from '../Exceptional/Exceptional';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
  return (
    <div className=''>
     <Banner/>
     <Info/>
     <Services/>
     <ExcePtional/>
     <MakeAppointment/>
     <Testimonials/>
     <ContactUs/>
    </div>
  );
};

export default Home;