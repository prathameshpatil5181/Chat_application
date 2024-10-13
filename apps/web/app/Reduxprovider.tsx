"use client";
import { Provider } from "react-redux";
import Store from "../Store/Store";
const Reduxprovider = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="w-full h-full">
        <Provider store={Store}>{children}</Provider>
      </div>
    );
};

export default Reduxprovider;