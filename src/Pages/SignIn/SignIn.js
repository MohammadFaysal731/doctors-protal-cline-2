import React from "react";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.inti";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading/Loading";
const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
   reset
  } = useForm();
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
const [token]=useToken(emailUser || googleUser)

  let singInError;

  const navigate = useNavigate();
  const location=useLocation();
  const from= location.state?.from?.pathname ||'/'

 useEffect(() => {
   if (token) {
     navigate(from, { replace: true });
   }
 }, [token, navigate, from]);

  if (emailLoading || googleLoading) {
    return <Loading/>
  }

  if (emailError || googleError) {
    singInError = (
      <p className="text-red-500">
        <small>{emailError?.message || googleError?.message}</small>
      </p>
    );
  }
  

 const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                value="Sign in"
                className="btn btn-outline btn-accent w-full max-w-xs"
              />
            </form>
            <small className="text-center font-bold">
              New to Doctors Portal ?&nbsp;
              <Link to="/signup">
                <span className="text-secondary">Create New Account</span>
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

export default SignIn;
