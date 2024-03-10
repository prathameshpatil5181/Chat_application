import ChatPage from "../../../components/ChatPage/ChatPage";
import ChatNav from "../../../components/ChatPage/ChatNav";
const Chatpage = () => {
  return (
    <div className="w-full h-full grid grid-flow-row grid-rows-[8%,92%] m-0 bg-blue-50">
      <div className="h-fit">
        <ChatNav />
      </div>
      <div className="w-full h-full">
        <ChatPage />
      </div>
    </div>
  );
};

export default Chatpage;
