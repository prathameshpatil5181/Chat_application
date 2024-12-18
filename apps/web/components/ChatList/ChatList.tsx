"use client";
import ChatCard from "../ChatCard/ChatCard";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../Store/hooks";
import { setReceiver } from "../../Store/Userslices/UserMiddlerware";
import { useAppDispatch } from "../../Store/hooks";
interface Iconnections {
  emailId: string;
  name: string;
  id: string;
}
interface gphandler {
  gid: string;
  name: string;
  Members: string[];
  createdOn: string;
  Admins: string[];
  createdBy: string;
}

const ChatList: React.FC = () => {
  const router = useRouter();
  const conns = useAppSelector((state) => state.userCon.users);
  const groups = useAppSelector(state => state.group.groups);
const dispatch = useAppDispatch();
  const chatHandler = (user: Iconnections) => {
    dispatch(setReceiver(user.emailId));
    router.push(`/Home/${user.emailId}`);
  };

  const GroupchatHandler = (id: gphandler) => {
    // dispatch(setGroup(id.gid));
    router.push(`/Home/group/${id.gid}`);
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
              profimage={x.profilePicture}
              name={x.name}
              lastchat={`hii from ${x.name}`}
              lasttime="11:20"
            />
          </li>
        ))}
        {groups.map((x, index) => (
          <li key={index} onClick={() => GroupchatHandler(x)}>
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
