"use client";
import ChatCard from "../ChatCard/ChatCard";
import Link from "next/link";
import { useEffect, useState } from "react";
const ChatList: React.FC = () => {
  const [connections, setConnections] = useState<string[]>([]);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/auth/getConnections",
          {
            method: "GET",
            credentials: "include",
            // should be there
          }
        );

        const jsonResponse = await response.json();

        if (jsonResponse.connections.length !== 0) {
          setConnections(jsonResponse.connections);
          localStorage.setItem('send',jsonResponse.connections[0]);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getConnections();
  }, []);

  return (
    <div className="h-[100vh] w-full no-scrollbar bg-blue-50 overflow-x-scroll">
      <ul className="grid grid-flow-row  gap-5 ">
        {connections.map((x) => (
          <li>
            <Link href={`/Home/${x}`}>
              <ChatCard />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
