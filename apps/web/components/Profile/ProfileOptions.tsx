"use client";

import React, { useEffect } from "react";
import ProfileOptionCard from "./ProfileOptionCard";
import Profile from "../../SVG/Profile";
import AboutSvg from "../../SVG/AboutSvg";
import ProfilePhoto from "./ProfilePhoto";
import { setUserDetail } from "../../Utils/UtilityFunctions";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { userDetailActions } from "../../Store/Userslices/userSlice";

const ProfileOptions: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const updateuser = async () => {
    if (user.name === "" && user.id === "") {
      const response = await setUserDetail();
      dispatch(userDetailActions.setUser(response.result));
    }
  };

  useEffect(() => {
    updateuser();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center pt-5 gap-5">
      <div className="h-fit">
        <ProfilePhoto photo={user.profilePicture} />
      </div>
      <ul className="flex flex-col gap-3 p-2 w-full">
        <li>
          <ProfileOptionCard
            svg={<Profile />}
            value={user.name}
            title="Name"
            edit={true}
          />
        </li>
        <li>
          <ProfileOptionCard
            svg={<AboutSvg />}
            value={user.status}
            title="About"
            edit={true}
          />
        </li>
      </ul>
    </div>
  );
};

export default ProfileOptions;
