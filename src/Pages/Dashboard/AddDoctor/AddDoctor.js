import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../Pages/Shared/Loading/Loading';
const AddDoctor = () => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      reset
    } = useForm();

    const { data: services, isLoading } = useQuery("services", () =>
      fetch(`http://localhost:5000/services`).then((res) => res.json())
    );

    const imageStorageKey = `45c46a1b32a1d6a38d670e42fa5d2349`;

    /**
     * 3 way to store images 
     * a.third party storage free open storage is ok for practice project
     * b.your own storage in your own server (file system)
     * c.database:mongodb
     * 
     * YUP: to validate file: search: Yup file validation for react hook from
     */ 

     const onSubmit = (data) => {
     // this fetch for post image in imgbb
      const image= data.image[0];
      const formData= new FormData();
      formData.append('image',image);
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
      fetch(url,{
        method:'POST',
        body:formData
      })
      .then(res=> res.json())
      .then(result=>{
        if(result.success){
          const img=result.data.url;
          const doctor={
            name:data.name,
            email:data.email,
            specialty:data.specialty,
            image:img
          }
          // send all the data in mongodb database
          fetch(`http://localhost:5000/doctor`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success('Doctor added successfully');
                reset();
              }
              else{
                toast.error('Failed to add the doctor');
              }
            });
            
        }
      })
     }
     if(isLoading){
      return <Loading/>
     }
  return (
    <>
      <h2 className="text-center font-semibold">Add A New Doctor</h2>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-5 bg-base-300 rounded-lg"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name Is Required",
                },
              })}
              type="name"
              placeholder="Your Name"
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Is Required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide A Valid Email",
                },
              })}
              type="email"
              placeholder="Your Email"
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {errors.email?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Specialty</span>
            </label>
            <select {...register("specialty")} className="select w-full max-w-xs input-bordered">
              {services?.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              {...register("image", {
                required: {
                  value: true,
                  message: "Image Is Required",
                },
              })}
              type="file"
              autoComplete="off"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>

          <input
            type="submit"
            value="Add"
            className="btn btn-outline btn-accent w-full max-w-xs"
          />
        </form>
      </div>
    </>
  );
};

export default AddDoctor;