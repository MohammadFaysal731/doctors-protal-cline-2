import React from 'react';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import InfoCard from './InfoCard/InfoCard';
const Info = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <InfoCard
        cardTitle="Opening Hours"
        bgClass="bg-gradient-to-r from-primary to-secondary pt-4"
        img={clock}
      />
      <InfoCard
        cardTitle="Our Locations"
        bgClass="bg-accent pt-4"
        img={marker}
      />
      <InfoCard
        cardTitle="Contact Us"
        bgClass="bg-gradient-to-r from-primary to-secondary pt-4"
        img={phone}
      />
    </div>
  );
};

export default Info;