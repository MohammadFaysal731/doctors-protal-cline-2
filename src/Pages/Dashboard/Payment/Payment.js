import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loading from "../../../Pages/Shared/Loading/Loading";
import CheckoutForm from './CheckoutForm/CheckoutForm';
const stripePromise = loadStripe("pk_test_51LtrOxFHsxQagk8q7KH5tMqR0lbAucQ4rM0NsVJ5OqAtztQoISHfeML2AczQzpzMBgA6CZqaySmZBFA3evxaHCJI00vCx2El0R");



const Payment = () => {
  const {id}=useParams();
  const url =`http://localhost:5000/booking/${id}`
  const { data:appointment, isLoading}=useQuery(['booking',id],()=>fetch(url,{
    method:'GET',
    headers:{
      'content-type':'application/json',
      authorization:`Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));
  
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
      <Link to="/dashboard">
        <button className="btn btn-xs btn-secondary m-5 text-white">
          Back
        </button>
      </Link>

      <div className="font-semibold">
        <div className="card w-50 max-w-md bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <p>
              Hello,
              <span className="text-purple-500">{appointment.patientName}</span>
            </p>
            <h2 className="card-title">
              Please Pay for
              <span className="text-pink-500">{appointment.treatmentName}</span>
            </h2>
            <p>
              Your Appointment on
              <span className="text-secondary ">
                &nbsp;{appointment.treatmentDate}
              </span>
              &nbsp; at &nbsp;
              <span className="text-primary">{appointment.slot}</span>
            </p>
            <p className="text-p">
              Please Pay: ${" "}
              <span className="text-orange-500 ">{appointment.price}</span>
            </p>
          </div>
        </div>
        <div className="card  w-50 max-w-md shadow-xl bg-base-100 mx-auto mt-5">
          <div className="card-body ">
            <Elements stripe={stripePromise}>
              <CheckoutForm appointment={appointment} />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;