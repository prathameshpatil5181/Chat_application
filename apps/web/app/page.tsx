"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../Store/hooks";
import { userDetailActions } from "../Store/Userslices/userSlice";
import { setUserDetail } from "../Utils/UtilityFunctions";
const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const RedirectHandler = async () => {
    const response = await setUserDetail();
      if (response.success === false) {
        router.push("/login");
        return;
      }
      dispatch(userDetailActions.setUser(response.result));
      router.push("/Home/all");
    
  };

  useEffect(() => {
    RedirectHandler();
  }, []);

  return <div className="w-full h-full no-scrollbar"></div>;
};

export default page;
