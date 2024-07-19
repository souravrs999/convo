import Sidebar from "@/components/sidebar";
import { ReactNode, FC } from "react";

type ChatLayoutProps = { children: ReactNode };
const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return (
    <main className="flex bg-chat-background w-full h-full">
      <Sidebar />
      {children}
    </main>
  );
};
export default ChatLayout;
