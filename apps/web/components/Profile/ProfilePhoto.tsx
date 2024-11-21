"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CameraSvg from "../../SVG/CameraSvg";
import { useAppDispatch} from "../../Store/hooks";
import { userDetailActions } from "../../Store/Userslices/userSlice";
import LoadingSpinnerSvg from "../../SVG/LoadingSpinnerSvg"
import { Serverurl } from "../../Utils/UtilityFunctions";
interface IProfilePhoto {
  photo: string;
}

const ProfilePhoto: React.FC<IProfilePhoto> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [imageLoading, setimagLoading] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(props.photo);
  const handleChangProfile = (): void => {
    inputRef.current?.click();
  };

  useEffect(() => {
    setImagePath(props.photo);
  },[props.photo])


  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setimagLoading(true);
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const imageData = new FormData();

      let reader = new FileReader();
      console.log("next");
      let result: string | ArrayBuffer | null;
      reader.onload = async function () {
        //  const  base64String = reader.result?.replace("data:", "")
        //       .replace(/^.+,/, "");

        //   const imageBase64Stringsep = base64String;

        // alert(imageBase64Stringsep);
        // console.log(base64String);
        result = reader.result;

        try {
          const response = await fetch(
            `${Serverurl}/user/updateprofileimage`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: result,
              }),
            }
          );
          const jsonResponse = await response.json();
          // setImagePath(jsonResponse.result); 
          dispatch(
            userDetailActions.updateField({
              field: "profilePicture",
              value: jsonResponse.result,
            })
          );
        } catch (error) {
          console.log(error);
        } 
      };
      //@ts-ignore
      reader.readAsDataURL(file);

      //@ts-ignore
      imageData.append("image", file);
  
      // try {
      //   const response = await fetch(
      //     "http://localhost:8000/user/updateprofileimage",
      //     {
      //       method: "POST",
      //       credentials: "include",
      //       body: imageData,
      //     }
      //   );
      //   const jsonResponse = await response.json();
      //   console.log("image respose");
      //   console.log(jsonResponse);
      // } catch (error) {
      //   console.log(error);
      // }

      // if (file instanceof Blob) {
      //   const url = URL.createObjectURL(file);
      //   console.log(url);
      //   setImagePath(url);
      // }
    }
  };

  return (
    <div className="h-full w-full relative">
      <div className="rounded-[50%] border z-10 h-[200px] w-[200px] flex items-center justify-center">

        {imagePath || imageLoading? <Image
          src={props.photo}
          alt="profile"
          height={100}
          width={100}
          className="object-cover z-0 rounded-[50%] h-[200px] w-[200px]"
          priority={false}
        />:<LoadingSpinnerSvg/>}

       
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
