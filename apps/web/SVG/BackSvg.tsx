"use client";

import React from "react";
import { useRouter } from "next/navigation";
const BackSvg = () => {
  const route = useRouter();

  const handleBack = (): void => {
    route.back();
  };

  return (
    <div onClick={handleBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        version="1.1"
        id="Capa_1"
        width="15px"
        height="15px"
        viewBox="0 0 44.952 44.952"
        xmlSpace="preserve"
        transform="rotate(180)"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0 c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028 c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001 l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z" />{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
};

export default BackSvg;