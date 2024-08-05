"use client";
import { useBoundStore } from "@/lib/store";
import { FC, useEffect } from "react";

const MessageQueueHandler: FC<{}> = () => {
  const messageQueue = useBoundStore((state) => state.messageQueue);
  console.log(messageQueue);
  return <></>;
};
export default MessageQueueHandler;
