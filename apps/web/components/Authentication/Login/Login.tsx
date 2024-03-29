"use client";

import Link from "next/link";
import React, { useState } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
interface AuthInterface {
  value: string;
  isValid: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });
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
      try {
        const response = await fetch("http://localhost:8000/auth/login", {
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
        }
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
    <div className="bg-white">
      <div>
        <div>Samwad</div>
        <div>Welcome Back</div>
        <div>Please Enter your detail to sign in.</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email/Username</label>
          <input
            type="text"
            id="email"
            placeholder="Email/Username"
            value={email.value}
            onChange={handleEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password.value}
            onChange={handlePassword}
          />
        </div>
        <div>
          <div>
            <input type="checkbox" id="Remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p>Forgot Password?</p>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      <div>
        Don't have an account yet? <Link href={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
