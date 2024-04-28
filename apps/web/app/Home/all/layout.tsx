"use client";

import Navigation from "../../../components/Navigation/Navigation";
import FooterNavigation from "../../../components/Navigation/FooterNavigation";
import { useAppSelector } from "../../../Store/hooks";
import ModelWrapper from "../../../components/Model/ModelWrapper";
import AddPeopleModel from "../../../components/Model/AddPeopleModel";
import Creategroupsvg from "../../../SVG/creategroupsvg";
import CreateGroupModel from "../../../components/Model/CreateGroupModel";
import { useAppDispatch } from "../../../Store/hooks";
import { ModelActions } from "../../../Store/UiSlices/ModelSlice";
import {motion } from "framer-motion";
export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const isVisible = useAppSelector((state) => state.model);
  const dispatch = useAppDispatch();
  
  return (
    
      <motion.div
        className="w-full h-full overflow-hidden"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity:0
        }}
        transition={{
          delay: 0.5,
        }}
      >
        <div className="grid grid-rows-[13%,80%,7%] w-full h-full ">
          {isVisible.isVisible && (
            <div className="w-full h-full absolute backdrop-blur-sm flex items-center justify-center overflow-scroll">
              <ModelWrapper className="">
                {isVisible.component === "addPeople" ? (
                  <AddPeopleModel />
                ) : (
                  <CreateGroupModel />
                )}
              </ModelWrapper>
            </div>
          )}
          <div className="w-full h-full">
            <Navigation />
          </div>
          <div className="no-scrollbar h-fit w-full">{children}</div>
          <div>
            <FooterNavigation />
          </div>
        </div>
        {!isVisible.isVisible && (
          <div
            className="text-black bg-blue-200 h-10 w-10  absolute bottom-20 right-7 rounded-full flex items-center justify-center"
            onClick={() => dispatch(ModelActions.toogleModel("createGroup"))}
          >
            <Creategroupsvg />
          </div>
        )}
      </motion.div>
  );
}
