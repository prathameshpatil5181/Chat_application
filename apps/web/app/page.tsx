
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const page = () => {
 
  const router = useRouter();

  const RedirectHandler = async () => {
    try {
      const res = await fetch(`http://localhost:8000/auth/validate`, {
        credentials:'include'
      });

      const response = await res.json();
      console.log(response);
      if (response.success === false) {
        router.push("/login");
        return;
      }
      router.push("/Home/all");
    } catch (error) {
      console.error(error);
      throw Error;
    }
  };

  useEffect(() => {
    RedirectHandler();
  }, []);

  return <div className="w-full h-full no-scrollbar"></div>;
};

export default page;
