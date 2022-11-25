import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.inti';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading/Loading';

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
    
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token]=useToken(emailUser || googleUser)
  
  const navigate = useNavigate();

 
  let singInError;

  useEffect(() => {
    if (token) {
    navigate("/appointment");
    }
    }, [token, navigate]);

  if (emailLoading || googleLoading ||updating) {
    return <Loading />;
  }

  if (emailError || googleError ||updateError) {
    singInError = (
      <p className="text-red-500">
        <small>{emailError?.message || googleError?.message ||updateError?.message}</small>
      </p>
    );
  }
  
 const onSubmit = async(data) => {
   const name = data.name;
   const email = data.email;
   const password = data.password;
   await createUserWithEmailAndPassword(email, password);
   await updateProfile({ displayName:name })
   toast.success('update done')
   reset();
 };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name Is Required",
                    }
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password Is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must Be 6 Characters Or Longer",
                    },
                  })}
                  type="password"
                  placeholder="Your Password"
                  autoComplete="off"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              {singInError}
              <input
                type="submit"
                value="Sign up"
                className="btn btn-outline btn-accent w-full max-w-xs"
              />
            </form>
            <small className="text-center font-bold">
              Already have an account ?&nbsp;
              <Link to="/signin">
                <span className="text-secondary">Please Sign In</span>
              </Link>
            </small>
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline btn-accent"
            >
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;