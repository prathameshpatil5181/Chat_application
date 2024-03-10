import ChatCard from "../ChatCard/ChatCard";
import Link from "next/link";
const ChatList: React.FC = () => {
  return (
    <div className="h-[100vh] w-full no-scrollbar bg-blue-50 overflow-x-scroll">
      <ul className="grid grid-flow-row  gap-5 ">
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
        <li>
          <Link href="/Home/Prathamesh">
            <ChatCard />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ChatList;
