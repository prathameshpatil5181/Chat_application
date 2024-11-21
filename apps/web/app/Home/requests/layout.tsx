
import RequestHeader from "../../../components/RequestPage/RequestHeader";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  //save the session
  // sessionHandler();

  return (
      <div className="w-full h-full">
          <div>
              <RequestHeader/>
          </div>
      <div className="h-[95%]">{children}</div>
    </div>
  );
}
