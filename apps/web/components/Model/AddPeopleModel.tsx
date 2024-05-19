"use client";

import React, { useState, useRef } from "react";
import ModelChatCard from "./ModelChatCard";
import SearchSvg from "../../SVG/footersvg/SearchSvg";
import { motion } from "framer-motion";
import { debounce } from "../../Utils/UtilityFunctions";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../Store/hooks";
import { setReceiver } from "../../Store/Userslices/UserMiddlerware";
import { useAppSelector } from "../../Store/hooks";
import { ModelActions } from "../../Store/UiSlices/ModelSlice";
import { Serverurl } from "../../Utils/UtilityFunctions";
interface Imodelchatcard {
  name: string;
  emailId: string;
  id: string;
  profilePicture:string;
}

const AddPeopleModel: React.FC = () => {
  const [users, setusers] = useState<[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const UserConnectionState = useAppSelector((state) => state.userCon.users);
  const getResult = async () => {
    const searchString = inputRef.current?.value;
    try {
      const response = await fetch(`${Serverurl}/searchUser/search`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: searchString,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonResponse = await response.json();
      //@ts-ignore
      setusers(jsonResponse.result);
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  const onChangeHandler = debounce(getResult, 2000);

  const addUserHandler = async (result: Imodelchatcard) => {
    const user = UserConnectionState.find((x) => x.emailId === result.emailId);

    if (user) {
      dispatch(setReceiver(result.id));
      route.push(`/Home/${result.id}`);
      return;
    }

    try {
      const requestResult = await fetch(`${Serverurl}/user/addUser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addUser: result.emailId,
        }),
      });

      if (requestResult.status === 500) {
        throw new Error("User not added");
      }

      const requestJson = await requestResult.json();
      if (requestJson.success===true) {
        // dispatch(setReceiver(result.id));
        dispatch(ModelActions.hideModel());
        route.push(`/Home/${result.id}`);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <motion.div
      className="bg-slate-50 p-5 rounded-xl flex flex-col gap-3 backdrop-blur-md"
      initial={{
        y: "500%",
      }}
      animate={{
        y: "0%",
      }}
      exit={{
        y: "500%",
      }}
    >
      <div className="bg-white rounded-xl flex flex-row p-2 items-center gap-3">
        <div>
          <SearchSvg />
        </div>
        <input
          type="text"
          className=" focus:outline-none "
          placeholder="Search"
          ref={inputRef}
          onChange={onChangeHandler}
        />
      </div>
      <div className="bg-white rounded-xl flex flex-col p-3 gap-3">
        <div>Results</div>
        <motion.div
          className="flex flex-col gap-5"
          transition={{ staggerChildren: 0.1 }}
        >
          <ul>
            {users.length > 0 &&
              users.map((result: Imodelchatcard) => (
                <li key={result.id} onClick={() => addUserHandler(result)}>
                  <ModelChatCard
                    name={result.name}
                    id={result.id}
                    email={result.emailId}
                    profile={result.profilePicture}
                  />
                </li>
              ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddPeopleModel;
