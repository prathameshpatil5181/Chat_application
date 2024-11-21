import React,{useEffect, useRef} from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";
interface demodateType {
  name: string;
  lastchat: string;
  lasttime?: string;
  profimage?:string
}






const ChatCard: React.FC<demodateType> = ({ name, lastchat, lasttime, profimage }) => {
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    console.log(e.button);
  };
  const refMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleContextMenu(
      e:any
    ) {
      e.preventDefault();
      console.log(e.button)// prevents the default right-click menu from appearing
    }
    // add the event listener to the component's root element
    refMenu.current?.addEventListener("contextmenu", handleContextMenu);
    // const rootElement = document.getElementById("my-component");
    // rootElement?.addEventListener("contextmenu", handleContextMenu);
    // remove the event listener when the component is unmounted

    return () => {
       refMenu.current?.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);


  return (
    <div
      className="flex flex-row gap-2 h-full w-full my-component"
      ref={refMenu}
      onClick={(e) => handleClick(e)}
    >
      <div className="w-20 h-14 rounded-[50%] p-[2px]">
        <Image
          src={profimage ? profimage : profileimage}
          alt="profileImage"
          height={100}
          width={100}
          className="object-cover rounded-[50%] w-14 h-14"
          priority={true}
        />
      </div>

      <div className="flex flex-col w-full h-full py-2">
        <div className="grid grid-flow-col borderw-full h-full">
          <div className="text-md">{name}</div>
          <div className="justify-self-end text-slate-400 text-sm">
            {lasttime}
          </div>
        </div>
        <div className="text-sm">{lastchat}</div>
      </div>
    </div>
  );
};

export default ChatCard;
