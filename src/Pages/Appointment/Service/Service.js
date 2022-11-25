import React from "react";

const Service = ({ service, setTreatment }) => {
  const { name, slots,price } = service;
  return (
    <>
      <div className="card lg:max-w-lg bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="text-xl font-bold text-secondary">{name}</h2>
          <p className="text-sm">
            {slots.length > 0 ? (
              <span>{slots[0]}</span>
            ) : (
              <span className="text-red-500">
                No Slot Available Try Another Date
              </span>
            )}
          </p>
          <p className="text-sm">
            {slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
          </p>
          <p><small>$ {price}</small></p>
          <div className="card-actions justify-center">
            {/* <!-- The button to open modal --> */}
            <label
              htmlFor="booking-modal"
              className="btn modal-button btn-sm btn-secondary text-white uppercase"
              disabled={slots.length === 0}
              onClick={() => setTreatment(service)}
            >
              Book Appointment
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
