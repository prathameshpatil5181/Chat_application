import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useAppSelector } from "../../Store/hooks";
import { Serverurl } from "../../Utils/UtilityFunctions";
import profileimage from "../../public/profile.jpg";
const CreateGroupModel: React.FC = () => {
  const users = useAppSelector((state) => state.userCon.users);
  const [members, setMembers] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async() => {

        if (inputRef.current?.value === '') {
            console.log('enter the group name');
            return;
        }

        try {
          const requestResult = await fetch(`${Serverurl}/user/creategroup`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: inputRef.current?.value,
              members: members,
            }),
          });

          if (requestResult.status === 500) {
            throw new Error("group not created");
          }

          const requestJson = await requestResult.json();
        //   if (requestJson.success === true) {
        //     // dispatch(setReceiver(result.id));
        //     dispatch(ModelActions.hideModel());
        //     route.push(`/Home/${result.id}`);
            //   }
            console.log(requestJson);
        } catch (error) {
          console.log("error");
        }
        



    }
    
    
    
  return (
    <div>
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
          <input
            type="text"
            className=" focus:outline-none "
            placeholder="Group Name"
            ref={inputRef}
          />
        </div>
        <div className="bg-white rounded-xl flex flex-col p-3 gap-3">
          <div>Results</div>
          <motion.div
            className="flex flex-col gap-5"
            transition={{ staggerChildren: 0.1 }}
          >
            <ul className="flex flex-col gap-2">
              {users.length > 0 &&
                users.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => {
                      setMembers((prevState) => {
                        if (prevState.includes(result.id)) {
                          return prevState.filter((x) => x !== result.id);
                        }
                        return [...prevState, result.id];
                      });
                    }}
                        
                        className={`${members.includes(result.id) && 'bg-slate-100'} rounded-md p-1`}
                  >
                    <div
                      key={result.id}
                      className="grid grid-cols-[20%,80%] items-center justify-center"
                    >
                      <div>
                        <Image
                          src={result.profilePicture?result.profilePicture:profileimage}
                          alt="profileImage"
                          height={50}
                          width={50}
                          className="object-cover rounded-md w-10 h-10"
                          priority={false}
                        />
                      </div>
                      <div className="flex flex-col text-slate-900 justify-self-center">
                        <div className="text-md">{result.name}</div>
                        <div className="text-sm text-slate-500">
                          {result.emailId}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </motion.div>
                  <button onClick={handleClick}>Create</button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateGroupModel;
