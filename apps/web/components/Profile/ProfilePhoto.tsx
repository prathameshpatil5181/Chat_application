"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import CameraSvg from "../../SVG/CameraSvg";
const ProfilePhoto: React.FC = () => {
  const [imagePath, setImagePath] = useState<string>("/profile.jpg");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangProfile = (): void => {
    inputRef.current?.click();
  };

  const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>): void => {

    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file instanceof Blob) {
        const url = URL.createObjectURL(file);
        setImagePath(url);
      }
    }
  };

  return (
    <div className="h-full w-full relative">
      <div className="rounded-[50%] border z-10 h-[200px] w-[200px]">
        <Image
          src={imagePath}
          alt="profile"
          height={100}
          width={100}
          className="object-cover z-0 rounded-[50%] h-[200px] w-[200px]"
          priority={false}
        />
      </div>
      <div
        className="bg-white w-fit rounded-[50%] p-2 absolute top-32 left-36 "
        onClick={handleChangProfile}
      >
        <CameraSvg />
        <input type="file" hidden ref={inputRef} onChange={handleChangeImage} />
      </div>
    </div>
  );
};

export default ProfilePhoto;
