// import {useState } from 'react'
// import { useSocket } from './context/SocketProvider';
import Navigation from "../components/Navigation/Navigation";
import Homepage from "./Home/all/page";
const page = () => {
  // const {sendMessage,messages} = useSocket();
  // const [message,setMessage] = useState('');

  // const changeHandler= (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   setMessage(e.target.value);
  // }

  return (
    <div className="w-full h-full no-scrollbar">{/* <Navigation/> */}</div>
  );
};

export default page;
