"use client";
import {useState } from 'react'
import { useSocket } from './context/SocketProvider';
const page = () => {
  const {sendMessage,messages} = useSocket();
  const [message,setMessage] = useState('');

  const changeHandler= (e:React.ChangeEvent<HTMLInputElement>)=>{
    setMessage(e.target.value);
  }

  return (
    <div>
      <div>
        This is chat Window
      </div>
      <div>
        <input type='text' placeholder='Message...' onChange={changeHandler}/>
        <button onClick={()=>sendMessage(message)}>Send</button>
      </div>
      <div>
      {messages.map((e) => (
        <ul>
          <li key={e}>{e}</li>
        </ul>
        ))}
      </div>
    </div>
  )
}

export default page
