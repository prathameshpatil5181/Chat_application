"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Serverurl } from "../../../Utils/UtilityFunctions";
interface AuthInterface {
  value: string;
  isValid: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [password, setPassword] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const router = useRouter();

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.value.trim() && password.value.trim()) {
      setIsLogging((prevState) => !prevState);
      try {
        const response = await fetch(`${Serverurl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          // should be there
        });
        const jsonResponse = await response.json();

        if (jsonResponse.message === "User logged in successfully") {
          router.push("/Home/all");
          return;
        }
        setIsLoggedIn(true);
        setIsLogging((prevState) => !prevState);
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      // Either email or password is empty
      console.error("Please enter both email and password");
    }
  };

  return (
    <div>
      <AnimatePresence>
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl ">
          <h1 className="text-4xl font-medium">Samwad</h1>
          <p className="text-slate-500">Hi, Welcome back 👋</p>

          <div className="my-5">
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                width={6}
                height={6}
                alt="img"
              />{" "}
              <span>Login with Google</span>
            </button>
          </div>
          <motion.div className="text-red-600">
            {isLoggedIn && "Invalid email or Password"}
          </motion.div>
          <form action="" className="my-10" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email.value}
                  onChange={handleEmail}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">Password</p>
                <div className="w-full grid grid-cols-[80%,20%] border border-slate-200 rounded-lg pl-3 focus:border-slate-500 hover:shadow items-center ">
                  <input
                    id="password"
                    name="password"
                    type={!showPassword ? "password" : "text"}
                    value={password.value}
                    onChange={handlePassword}
                    className="w-fit py-3  focus:outline-none "
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                    className="px-3 py-3 self-end justify-self-center "
                  >
                    Show
                  </div>
                </div>
              </label>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="remember" className="">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                    />
                  </label>
                  <div>Remember me</div>
                </div>
                <div>
                  <a href="#" className="font-medium text-indigo-600">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <AnimatePresence>
                {!isLogging ? (
                  <button
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                    type="submit"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </motion.svg>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Login
                    </motion.span>
                  </button>
                ) : (
                  <div className="w-full py-1 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 200"
                      height={40}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        r="15"
                        cx="40"
                        cy="100"
                      >
                        <animate
                          attributeName="opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0;1;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.4"
                        ></animate>
                      </circle>
                      <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        r="15"
                        cx="100"
                        cy="100"
                      >
                        <animate
                          attributeName="opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0;1;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.2"
                        ></animate>
                      </circle>
                      <circle
                        fill="#FFFFFF"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        r="15"
                        cx="160"
                        cy="100"
                      >
                        <animate
                          attributeName="opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0;1;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="0"
                        ></animate>
                      </circle>
                    </motion.svg>
                  </div>
                )}
              </AnimatePresence>
              <p className="text-center">
                Not registered yet?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Login;
