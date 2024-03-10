import React from "react";
import Model from "../../UI/Model";
import Link from "next/link";
const OptionModel: React.FC = () => {
  return (
    <div>
      <Model styles="p-2 bg-slate-200 text-lg">
        <ul>
          <Link href={"/Home/profile"}>
            <li>Profile</li>
          </Link>
          <li>Settings</li>
        </ul>
      </Model>
    </div>
  );
};

export default OptionModel;
