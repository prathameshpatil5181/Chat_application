// import {useState } from 'react'
// import { useSocket } from './context/SocketProvider';
import ChatList from "../../../components/ChatList/ChatList";
const page = () => {
  // const {sendMessage,messages} = useSocket();
  // const [message,setMessage] = useState('');

  // const changeHandler= (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   setMessage(e.target.value);
  // }

  return (
    <div className="w-full h-full px-5 pt-2  bg-blue-50">
      <ChatList />
    </div>
  );
};

export default page;
