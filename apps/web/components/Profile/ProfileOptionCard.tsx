import React from "react";
import EditSvg from "../../SVG/EditSvg";
interface profileoptioninterface {
  svg?: React.ReactNode;
  title: string;
  value: string;
  edit: Boolean;
}

const ProfileOptionCard: React.FC<profileoptioninterface> = ({
  title,
  value,
  edit,
  svg,
}) => {
  return (
    <div className="h-full w-full grid grid-cols-[10%,80%,10%] gap-2 items-center bg-white rounded-full px-5 py-3 ">
      <div className="self-center">{svg}</div>
      <div>
        <div>{title}</div>
        <div>{value}</div>
      </div>
      {edit && (
        <div className="justify-self-end pr-5">
          <EditSvg />
        </div>
      )}
    </div>
  );
};

export default ProfileOptionCard;
