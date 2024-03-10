import React from "react";
import InputComponent from "./InputComponent";
const ChatPage = () => {
  return (
    <div className="w-full h-full flex flex-col  justify-center">
      <div className=" w-full h-[100vh] flex-1"></div>
      <div className="p-3 bg-white">
        <InputComponent />
      </div>
    </div>
  );
};

export default ChatPage;
