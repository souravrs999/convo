"use client";
import {
  FC,
  forwardRef,
  HTMLAttributes,
  Ref,
  useEffect,
  useState,
} from "react";
import { User } from "next-auth";

import { Message } from "@/lib/validations/message";
import { pusherClient } from "@/lib/pusher";
import { cn, toPusherKey } from "@/lib/utils";
import MessageBubble from "./message-bubble";

type ChatAreaProps = HTMLAttributes<HTMLDivElement> & {
  initialMessages: Message[];
  chatId: string;
  chatPartner: User;
  currentUser: User;
};
const ChatArea: FC<ChatAreaProps> = forwardRef(
  (props: ChatAreaProps, ref: Ref<HTMLDivElement>) => {
    const {
      initialMessages,
      chatId,
      chatPartner,
      currentUser,
      className,
      ...rest
    } = props;
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    useEffect(() => {
      const messageHandler = (message: Message): void => {
        setMessages((prev) => [message, ...prev]);
      };

      pusherClient.subscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.bind("incoming-message", messageHandler);
      return () => {
        pusherClient.unsubscribe(toPusherKey(`chat${chatId}`));
        pusherClient.unbind("incoming-message", messageHandler);
      };
    }, [chatId]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 flex flex-col-reverse gap-[2px] py-4 px-2 h-full overflow-y-auto  scrollbar-thumb-muted-foreground scrollbar-thumb-rounded-full scrollbar-thin",
          className
        )}
        {...rest}
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={`${message.id}-${message.timestamp}`}
            message={message}
            currentUser={currentUser}
            chatPartner={chatPartner}
            prevMessage={messages[index - 1]}
          />
        ))}
      </div>
    );
  }
);
ChatArea.displayName = "ChatArea";
export default ChatArea;
