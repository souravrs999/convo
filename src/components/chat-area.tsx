import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import { User } from "next-auth";

import { Message } from "@/lib/validations/message";

type ChatAreaProps = HTMLAttributes<HTMLDivElement> & {
  initialMessages: Message[];
  sessionId: string;
  chatId: string;
  sessionImg: string;
  chatPartner: User;
};
const ChatArea: FC<ChatAreaProps> = forwardRef(
  (props: ChatAreaProps, ref: Ref<HTMLDivElement>) => {
    return <></>;
  }
);
ChatArea.displayName = "ChatArea";
export default ChatArea;
