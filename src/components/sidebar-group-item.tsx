"use client";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";

type SidebarGroupItemProps = HTMLAttributes<HTMLDivElement> & { user: User };
const SidebarGroupItem: FC<SidebarGroupItemProps> = forwardRef(
  (props: SidebarGroupItemProps, ref: Ref<HTMLDivElement>) => {
    const { className, user, ...rest } = props;
    const pathname = usePathname();
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 w-full p-3 hover:bg-muted-foreground cursor-pointer border-b",
          { "bg-muted-foreground": pathname.includes(user.id) },
          className
        )}
        {...rest}
      >
        <Image
          src={user.image!}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-1 flex-col overflow-hidden ml-1">
          <h4 className="text-primary text-sm font-bold capitalize">
            {user.name}
          </h4>
          <p
            className={cn(
              "text-xs text-foreground truncate whitespace-nowrap",
              {}
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span className="text-xs text-foreground">00:00</span>
        </div>
      </div>
    );
  }
);
SidebarGroupItem.displayName = "SidebarGroupItem";
export default SidebarGroupItem;
