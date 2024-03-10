import Navigation from "../../../components/Navigation/Navigation";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[13%,87%]">
      <div className="w-full  h-full ">
        <Navigation />
      </div>
      <div className="no-scrollbar h-full w-full">{children}</div>
    </div>
  );
}
