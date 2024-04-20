"use client";
import ChatCard from "../ChatCard/ChatCard";
import { useRouter } from "next/navigation";

import { useAppSelector } from "../../Store/hooks";
interface Iconnections {
  emailId: string;
  name: string;
  id: string;
}

const ChatList: React.FC = () => {
  const router = useRouter();
  const conns = useAppSelector((state) => state.userCon.users);

  const chatHandler = (user: Iconnections) => {
    router.push(`/Home/${user.id}`);
  };

  if (conns.length === 0) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="h-[100vh] w-full no-scrollbar overflow-x-scroll">
      <ul className="grid grid-flow-row  gap-5 ">
        {conns.map((x, index) => (
          <li key={index} onClick={() => chatHandler(x)}>
            <ChatCard
              name={x.name}
              lastchat={`hii from ${x.name}`}
              lasttime="11:20"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
