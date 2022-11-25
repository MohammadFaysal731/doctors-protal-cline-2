import React from "react";
import cavity from "../../../assets/images/cavity.png";
import fluoride from "../../../assets/images/fluoride.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "../Service/Service";
const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nihil neque sit aperiam molestias adipisci pariatur suscipit ducimus odio in.",
      image: fluoride,
    },
    {
      _id: 2,
      name: "Fluoride Treatment",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nihil neque sit aperiam molestias adipisci pariatur suscipit ducimus odio in.",
      image: cavity,
    },
    {
      _id: 3,
      name: "Fluoride Treatment",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nihil neque sit aperiam molestias adipisci pariatur suscipit ducimus odio in.",
      image: whitening,
    },
  ];

  return (
    <div className="my-28">
      <div className="text-center ">
        <h3 className="text-primary text-xl font-bold uppercase">
          Our Services
        </h3>
        <h2 className="text-4xl">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service service={service} key={service._id} />
        ))}
      </div>
    </div>
  );
};

export default Services;
