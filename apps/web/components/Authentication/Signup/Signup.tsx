"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthInterface {
  value: string;
  isValid: boolean;
}

const Signup: React.FC = () => {
  const [name, setName] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });
  const [email, setEmail] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });
  const [password, setPassword] = useState<AuthInterface>({
    value: "",
    isValid: false,
  });

  const route = useRouter();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.value.trim() && email.value.trim() && password.value.trim()) {
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
          // should be there
        });

        const jsonResponse = await response.json();
        if(jsonResponse.success===true){
          localStorage.setItem('auth',jsonResponse.auth);
          route.push('/Home/all');
          console.log(jsonResponse);
        }
   
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      // At least one field is empty
      console.error("Please fill in all fields");
    }
  };

  return (
    <div className="bg-white">
      <div>
        <div>Samwad</div>
        <div>Welcome!</div>
        <div>Please enter your details to sign up.</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name.value}
            onChange={handleName}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
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
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        Already have an account? <Link href="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default Signup;
