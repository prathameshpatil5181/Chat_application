import React from "react";
import SearchSvg from "../../SVG/footersvg/SearchSvg";
const Navigation: React.FC = () => {
  return (
    <div className="h-full w-full bg-white font-medium">
      <nav className="h-full w-full p-5 flex flex-col gap-6">
        <div className="grid grid-cols-[10%,90%] items-center w-full h-fit rounded-2xl bg-slate-50">
          <div className="justify-self-center w-fit ">
            <SearchSvg />
          </div>
          <div>
            <input
              type="text"
              className="rounded-xl bg-slate-50 focus:outline-none px-2 w-full h-12"
              placeholder="Search your chat"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
