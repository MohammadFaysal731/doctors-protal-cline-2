import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl text-red-500">404 Page Not Found</h1>
       <Link to="/"><button className="btn btn-sm  btn-outline btn-accent m-5">Home</button></Link> 
      </div>
    </>
  );
};

export default NotFound;