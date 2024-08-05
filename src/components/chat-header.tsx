"use client";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import { User } from "next-auth";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import { useBoundStore } from "@/lib/store";

type ChatHeaderProps = HTMLAttributes<HTMLDivElement> & { members: User[] };
const ChatHeader: FC<ChatHeaderProps> = forwardRef(
  (props: ChatHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { members, className, ...rest } = props;

    const { chatContextBarOpen, toggleChatContextBarState } = useBoundStore(
      (state) => ({
        chatContextBarOpen: state.chatContextBarOpen,
        toggleChatContextBarState: state.toggleChatContextBarState,
      })
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-20 shrink-0 bg-white p-4 flex items-center justify-between border-b"
        )}
        {...rest}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {members.map((member) => (
              <Image
                key={member.id}
                src={member.image!}
                alt={member.name!}
                width={50}
                height={50}
                className="rounded-full border outline outline-[1px] outline-white"
              />
            ))}
          </div>
          <div className="flex flex-col overflow-hidden truncate">
            <h3 className="text-primary text-base font-bold capitalize truncate">
              {members?.map((m) => m.name).join(", ")}
            </h3>
            <p className="text-xs truncate">
              {members?.map((m) => m.email).join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center mr-2">
          <Button
            size="icon"
            className="p-0 bg-transparent text-primary hover:bg-muted-foreground"
          >
            <FontAwesomeIcon icon={Icons.magnifyingGlass} className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => toggleChatContextBarState(!chatContextBarOpen)}
            className="p-0 bg-transparent text-primary hover:bg-muted-foreground"
          >
            <FontAwesomeIcon icon={Icons.info} className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }
);
ChatHeader.displayName = "ChatHeader";
export default ChatHeader;
