import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Spinner from '../../../../assets/images/loading-spinner-image.gif';
const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { _id, price, patientName, patientEmail } = appointment;

  useEffect(() => {
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")} `,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patientEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      // console.log(paymentIntent);
      setSuccess(`Congrats! your payment is completed`);

      // store payment info on database
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };
      fetch(`http://localhost:5000/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs btn-secondary text-white mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      <>
        <div className="flex justify-center items-center ">
          {processing && (
            <img
              src={Spinner}
              alt=""
              className="w-24"
            />
          )}
          {cardError && (
            <p className="text-red-500">
              <small>{cardError}</small>
            </p>
          )}
          {success && (
            <div className="text-green-500">
              <p>
                <small>{success}</small>
              </p>
              <p>
                <small>
                  Your transactionId:
                  <span className="text-orange-500 font-semibold">
                    {transactionId}
                  </span>
                </small>
              </p>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default CheckoutForm;
