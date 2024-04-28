import GroupNav from "../../../../components/GroupPage/GroupNav";
import GroupChatPage from "../../../../components/GroupPage/GroupChatPage";
const GroupPage = () => {
  return (
    <div className="w-full h-full grid grid-flow-row grid-rows-[8%,92%] m-0 bg-blue-50">
      <div className="h-full w-full">
        <GroupNav />
      </div>
      <div className="w-full h-full">
        <GroupChatPage />
      </div>
    </div>
  );
};

export default GroupPage;
