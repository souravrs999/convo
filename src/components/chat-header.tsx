import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import { User } from "next-auth";

import Image from "next/image";
import { cn } from "@/lib/utils";

type ChatHeaderProps = HTMLAttributes<HTMLDivElement> & { members: User[] };
const ChatHeader: FC<ChatHeaderProps> = forwardRef(
  (props: ChatHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { members, className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-0 w-full h-20 shrink-0 bg-white bg-opacity-50 backdrop-blur-lg p-4 flex items-center justify-between border-b z-10"
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
                className="rounded-lg border outline outline-[1px] outline-white"
              />
            ))}
          </div>
          <div className="flex flex-col overflow-hidden truncate">
            <h3 className="text-accent text-base font-bold capitalize truncate">
              {members?.map((m) => m.name).join(", ")}
            </h3>
            <p className="text-xs truncate">
              {members?.map((m) => m.email).join(", ")}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
ChatHeader.displayName = "ChatHeader";
export default ChatHeader;
