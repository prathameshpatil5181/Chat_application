import React from "react";
import Options from "./OptionsModel/Options";
const Navigation: React.FC = () => {
  return (
    <div className="h-full w-full bg-white">
      <nav className="h-full w-full p-5 flex flex-col gap-6">
        <div className="grid grid-cols-2 items-center w-full h-full   rounded-2xl ">
          <h1
            className="justify-start text-3xl"
            style={{ fontFamily: "Oleo Script" }}
          >
            Samwad
          </h1>

          <div className="justify-self-end relative">
            <Options />
          </div>
        </div>
        <div className="h-full w-full">
          <ul className="grid grid-flow-col">
            <li className="justify-self-start">Chat</li>
            <li className="justify-self-center">Update</li>
            <li className="justify-self-end">Calls</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
