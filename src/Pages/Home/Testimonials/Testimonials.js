import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Review from './Review/Review';
const Testimonials = () => {
const reviews = [
  {
    _id: 1,
    name: "Winson Herrry",
    reviews:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur, at ad quis possimus ea voluptatem impedit necessitatibus amet optio!",
    image: people1,
    location:"California"
  },
  {
    _id: 2,
    name: "Winson Herrry",
    reviews:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur, at ad quis possimus ea voluptatem impedit necessitatibus amet optio!",
    image: people2,
    location:"California"
  },
  {
    _id: 3,
    name: "Winson Herrry",
    reviews:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur, at ad quis possimus ea voluptatem impedit necessitatibus amet optio!",
    image: people3,
    location:"California"
  },
];
  return (
    <section className="my-28">
      <div className="flex justify-between ">
        <div className="">
          <h4 className="text-xl text-primary font-bold">Testimonials</h4>
          <h2 className="text-3xl">What Our Patients Say</h2>
        </div>
        <div className="">
          <img src={quote} alt="" className="w-24 lg:w-48" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Review review={review} key={review._id} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;