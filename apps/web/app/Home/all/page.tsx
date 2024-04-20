
import ChatList from "../../../components/ChatList/ChatList";
const page = () => {


  return (
    <div className="w-full h-full px-5 pt-2 font-medium">
      <ul>
        <li key={1}>
          <ChatList />
        </li>
      </ul>
    </div>
  );
};

export default page;
