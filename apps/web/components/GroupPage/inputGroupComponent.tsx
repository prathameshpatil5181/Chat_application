"use client";

import { useEffect, useRef } from "react";

import { sendWsChatMessage } from "../../Store/Slices/socketActions";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

const InputGroupComponent: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
const active = useAppSelector((state) => state.group.activeGroup);
  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    dispatch(
      sendWsChatMessage({
        message: inputRef.current.value,
        type: "text",
        sentTime: new Date(),
        to: active.gid,
        Members: active.Members
      })
    );
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100">
      <div className="flex flex-row w-full gap-2  bg-slate-100">
        <div className="w-[95%]  h-[6vh] rounded-3xl bg-white p-1 ">
          <textarea
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              resize: "none",
            }}
            className=" w-[100%] rounded-3xl bg-white
          outline-0 h-full  px-3 whitespace-pre-wrap text-wrap text-justify text-md"
            placeholder="Message..."
            ref={inputRef}
          />
        </div>
        <div>
          <button className="bg-white rounded-full h-12 w-12 flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              id="send"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputGroupComponent;
