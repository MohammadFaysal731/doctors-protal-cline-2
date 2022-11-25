import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.inti";

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
  const { _id, name, slots,price } = treatment;
  const [user] = useAuthState(auth);
  const formattedDate = format(date, "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const phone = event.target.phone.value;

    const booking = {
      treatmentId: _id,
      treatmentName: name,
      slot,
      price,
      treatmentDate: formattedDate,
      patientEmail: user?.email,
      patientName: user?.displayName,
      phone,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            `Appointment is Set ${formattedDate} at ${slot} for ${name}`
          );
        }
         else {
          toast.error(
            `You have an appointment on ${data.booking?.treatmentDate} at ${data.booking?.slot} for ${data.booking?.treatmentName}`
          );
        }
        refetch();
        //to close the modal
        setTreatment(null);
      });
  };
  return (
    <>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal sm:modal-middle p-5">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle btn-secondary absolute right-2 top-2 text-white"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-center">
            Booking For: <span className="text-secondary">{name}</span>
          </h3>
          {/* booking form */}
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 justify-items-center mt-4"
          >
            {/* date */}
            <input
              type="text"
              name="date"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            {/* slot */}
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option value={slot} key={index}>
                  {slot}
                </option>
              ))}
            </select>
            {/* name */}
            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || ""}
              required
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            {/* email */}
            <input
              type="email"
              name="email"
              disabled
              value={user?.email || ""}
              required
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            {/* phone */}
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              required
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              className="w-full max-w-xs btn btn-secondary text-white"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
