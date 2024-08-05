import { Icons } from "@/lib/icons";
import { cn, formatTimestamp } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "next-auth";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, memo, Ref } from "react";

type MessageBubbleProps = HTMLAttributes<HTMLDivElement> & {
  currentUser: User;
  chatPartner: User;
  message: Message;
  prevMessage?: Message;
};
const MessageBubble: FC<MessageBubbleProps> = forwardRef(
  (props: MessageBubbleProps, ref: Ref<HTMLDivElement>) => {
    const {
      currentUser,
      chatPartner,
      message,
      prevMessage,
      className,
      ...rest
    } = props;
    const isCurrentUser = message.senderId === currentUser.id;
    const hasPrevMessageFromSameUser = isCurrentUser
      ? prevMessage?.senderId === currentUser.id
      : prevMessage?.senderId === chatPartner.id;

    return (
      <div
        ref={ref}
        className={cn("flex items-end", { "justify-end": isCurrentUser })}
        {...rest}
      >
        <div className="flex gap-1 items-end">
          <Image
            src={isCurrentUser ? currentUser.image! : chatPartner.image!}
            alt="avatar"
            width={40}
            height={40}
            className={cn("rounded-full", {
              "order-2": isCurrentUser,
              invisible: hasPrevMessageFromSameUser,
            })}
          />
          <div
            className={cn(
              "relative flex flex-col p-2 text-sm w-fit font-medium max-w-sm",
              {
                "bg-accent text-accent-foreground rounded-[10px_10px_3px_10px]":
                  isCurrentUser,
                "bg-muted-foreground text-primary rounded-[10px_10px_10px_3px] my-1":
                  !isCurrentUser,
              }
            )}
          >
            <p>{message.content}</p>
            <div className="flex gap-1 justify-end text-[10px] opacity-80">
              <time>{formatTimestamp(message.timestamp)}</time>
              <span
                className={cn("relative -space-x-1", {
                  "text-accent": !isCurrentUser,
                })}
              >
                <FontAwesomeIcon icon={Icons.check} />
                <FontAwesomeIcon icon={Icons.check} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
MessageBubble.displayName = "MessageBubble";
export default memo(MessageBubble);
