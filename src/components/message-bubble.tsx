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
        <div
          className={cn("flex items-end gap-1 text-sm", {
            "my-1": !isCurrentUser,
          })}
        >
          <Image
            src={isCurrentUser ? currentUser.image! : chatPartner.image!}
            alt="avatar"
            width={40}
            height={40}
            className={cn("rounded-full mb-5", {
              "order-2": isCurrentUser,
              "invisible mb-0": hasPrevMessageFromSameUser,
            })}
          />
          <div className="flex flex-col gap-1 max-w-sm">
            <div
              className={cn("p-2", {
                "bg-accent text-accent-foreground rounded-[10px_10px_3px_10px]":
                  isCurrentUser,
                "bg-muted-foreground text-primary rounded-[10px_10px_10px_3px]":
                  !isCurrentUser,
              })}
            >
              <p>{message.content}</p>
            </div>
            <div
              className={cn("flex gap-1 justify-end text-[10px] opacity-80", {
                hidden: hasPrevMessageFromSameUser,
              })}
            >
              <time>{formatTimestamp(message.timestamp)}</time>
              <span className={cn("relative -space-x-1")}>
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
