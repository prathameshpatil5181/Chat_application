"use client";

import React from "react";
import { useAppSelector } from "../../Store/hooks";
import { useRef, useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import { ModelActions } from "../../Store/UiSlices/ModelSlice";
import { AnimatePresence } from "framer-motion";
interface ImodelWrapper {
  children: React.ReactNode;
  className: string;
}

const ModelWrapper: React.FC<ImodelWrapper> = ({ children, className }) => {
  const isVisible = useAppSelector((state) => state.model.isVisible);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to handle click outside the modal
  //@ts-ignore
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(ModelActions.toogleModel(null));
    }
  };

  // Attach click event listener when the modal is open
  useEffect(() => {
    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
 
      <div
        className={`w-fit h-fit p-3 absolute rounded-md ${className}flex items-center justify-center `}
        ref={modalRef}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </div>
   
  );
};

export default ModelWrapper;
