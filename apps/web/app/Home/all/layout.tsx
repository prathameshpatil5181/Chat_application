"use client";

import Navigation from "../../../components/Navigation/Navigation";
import FooterNavigation from "../../../components/Navigation/FooterNavigation";
import { useAppSelector } from "../../../Store/hooks";
import ModelWrapper from "../../../components/Model/ModelWrapper";
import AddPeopleModel from "../../../components/Model/AddPeopleModel";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const isVisible = useAppSelector((state) => state.model.isVisible);

  return (
    <div className="grid grid-rows-[13%,80%,7%] w-full h-full overflow-hidden">
      {isVisible && (
        <div className="w-full h-full absolute backdrop-blur-sm flex items-center justify-center">
          <ModelWrapper className="">
              <AddPeopleModel />
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
  );
}
