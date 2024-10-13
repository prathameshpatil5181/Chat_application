"use client";


import Login from "../../components/Authentication/Login/Login";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../Store/hooks";
import { setUserDetail } from "../../Utils/UtilityFunctions";
import { userDetailActions } from "../../Store/Userslices/userSlice";
import { useEffect } from "react";
const Loginpage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const RedirectHandler = async () => {
    console.log("in loggin page");
    const response = await setUserDetail();
    console.log(response);
    if (response.success === false && response.status !== 200) {
      router.push("/login");
      return;
    }
    dispatch(userDetailActions.setUser(response.result));
    router.push("/Home/all");
  };

  useEffect(() => {
    RedirectHandler();
  }, []);

  return (
    <div className="w-full h-full px-5 pt-2 bg-slate-100">
      <Login />
    </div>
  );
};

export default Loginpage;
