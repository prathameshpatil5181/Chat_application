"use client"

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useAppDispatch } from "../../../../Store/hooks";
import { useParams } from "next/navigation";
import { setGroup } from "../../../../Store/GroupSlice/GroupMiddlewares";
import { useEffect } from "react";
export default function groupChatLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  }) {
  const id = useParams<Params>();
  const groupid = id.groupid.toString();
  const grp = decodeURIComponent(groupid);
  const dispatch = useAppDispatch();
  const setcurrentgroup = () => {
    dispatch(setGroup(grp));
  }

  useEffect(() => {
    setcurrentgroup();
  },[])
  
  return <div className="no-scrollbar h-full w-full">{children}</div>;
}
