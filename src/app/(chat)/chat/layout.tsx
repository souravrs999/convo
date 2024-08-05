import { ReactNode, FC } from "react";

import MiniBar from "@/components/mini-bar";
import Sidebar from "@/components/sidebar";
import MessageQueueHandler from "@/components/message-queue-handler";

type ChatLayoutProps = { children: ReactNode };
const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return (
    <main className="flex bg-chat-background w-full h-screen">
      <MiniBar />
      <Sidebar />
      {children}
    </main>
  );
};
export default ChatLayout;
