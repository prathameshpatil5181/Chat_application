import ChatNav from "../../../components/ChatPage/ChatNav";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="no-scrollbar h-full w-full">{children}</div>;
}
