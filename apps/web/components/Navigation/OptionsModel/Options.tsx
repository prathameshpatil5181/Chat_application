"use client";

import MenuThreeDots from "../../../SVG/MenuThreeDots";
import { useState } from "react";
import OptionModel from "./OptionModel";
const Options: React.FC = () => {
  const [showModel, setShowModel] = useState<Boolean>(false);

  return (
    <div className="grid grid-cols">
      <div onClick={() => setShowModel((prevstate) => !prevstate)}>
        <MenuThreeDots />
      </div>
      {showModel && (
        <div>
          <OptionModel />
        </div>
      )}
    </div>
  );
};

export default Options;
