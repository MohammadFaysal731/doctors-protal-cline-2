import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import Service from '../Service/Service';


const AvailableAppointments = ({date}) => {

  const [treatment,setTreatment]=useState(null); 
  const formattedDate=format(date,'PP');

  const { data: services, isLoading ,refetch} = useQuery(
    ["available", formattedDate],
    () =>
      fetch(`http://localhost:5000/available?date=${formattedDate}`).then(
        (res) => res.json()
      )
  );

      if(isLoading){
        return <Loading/>
      }
  return (
    <>
      <h4 className="text-lg text-secondary text-center font-bold m-5 whitespace-nowrap">
        Available Appointments On {format(date, "PP")}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services?.map((service) => (
          <Service service={service} key={service._id} setTreatment={setTreatment}/>
        ))}
      </div>
      {treatment && <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} refetch={refetch}/>}
    </>
  );
};

export default AvailableAppointments;