"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";
import { useBoundStore } from "@/lib/store";
import { Icons } from "@/lib/icons";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import LogoutButton from "./logout-button";

type MiniBarSeparatorProps = HTMLAttributes<HTMLSpanElement> & {};
const MiniBarSeparator: FC<MiniBarSeparatorProps> = forwardRef(
  (props: MiniBarSeparatorProps, ref: Ref<HTMLSpanElement>) => {
    const { className, ...rest } = props;
    return (
      <span
        ref={ref}
        className={cn("w-full h-[1px] bg-muted-foreground", className)}
        {...rest}
      />
    );
  }
);
MiniBarSeparator.displayName = "MiniBarSeparator";

type MiniBarItemProps = HTMLAttributes<HTMLDivElement> & {
  icon: ReactNode;
  title: string;
};
const MiniBarItem: FC<MiniBarItemProps> = forwardRef(
  (props: MiniBarItemProps, ref: Ref<HTMLDivElement>) => {
    const { icon, title, className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-1 text-foreground hover:text-accent cursor-pointer",
          className
        )}
        {...rest}
      >
        {icon}
        {/* <p className="text-[10px]">{title}</p> */}
      </div>
    );
  }
);
MiniBarItem.displayName = "MiniBarItem";

type MiniBarProps = HTMLAttributes<HTMLDivElement> & {};
const MiniBar: FC<MiniBarProps> = forwardRef(
  (props: MiniBarProps, ref: Ref<HTMLDivElement>) => {
    const { className, ...rest } = props;
    const user = useBoundStore((state) => state.user);

    return (
      <div
        ref={ref}
        className={cn(
          "w-20 h-screen border-r bg-background p-4 flex flex-col justify-between",
          className
        )}
        {...rest}
      >
        <div className="flex flex-col">
          <Avatar className="rounded-full mb-4">
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || ""}
            />
            <AvatarFallback>{user?.name || "UR"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-8 my-6">
            <MiniBarItem
              title="All chats"
              icon={
                <FontAwesomeIcon icon={Icons.message} className="w-5 h-5" />
              }
            />
            <MiniBarItem
              title="Work"
              icon={
                <FontAwesomeIcon icon={Icons.suitcase} className="w-5 h-5" />
              }
            />
            <MiniBarItem
              title="Personal"
              icon={
                <FontAwesomeIcon icon={Icons.commentDots} className="w-5 h-5" />
              }
            />
            <MiniBarItem
              title="Saved"
              icon={
                <FontAwesomeIcon icon={Icons.bookmark} className="w-5 h-5" />
              }
            />
            <MiniBarSeparator />
            <MiniBarItem
              title="Calendar"
              icon={
                <FontAwesomeIcon icon={Icons.calendar} className="w-5 h-5" />
              }
            />
            <MiniBarItem
              title="Files"
              icon={<FontAwesomeIcon icon={Icons.folder} className="w-5 h-5" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center">
          <MiniBarItem
            title="Settings"
            icon={<FontAwesomeIcon icon={Icons.gear} className="w-5 h-5" />}
          />
          <LogoutButton />
        </div>
      </div>
    );
  }
);
MiniBar.displayName = "MiniBar";
export default MiniBar;
