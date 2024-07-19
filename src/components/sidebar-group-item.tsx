import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";

type SidebarGroupItemProps = HTMLAttributes<HTMLDivElement> & { user: User };
const SidebarGroupItem: FC<SidebarGroupItemProps> = forwardRef(
  (props: SidebarGroupItemProps, ref: Ref<HTMLDivElement>) => {
    const { className, user, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 w-full px-2 py-4 hover:bg-[#fbf3ff] rounded-xl cursor-pointer",
          className
        )}
        {...rest}
      >
        <div className="relative shrink-0">
          <Image
            src={user.image!}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span
            className={cn(
              "absolute w-2 h-2 bg-gray-400 outline outline-[2px] outline-white rounded-full top-0 right-0"
            )}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <h4 className="text-accent font-semibold text-sm">{user.name}</h4>
          <p
            className={cn(
              "text-xs text-[#92809b] truncate whitespace-nowrap",
              {}
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span className="text-xs text-[#92809b]">00:00</span>
          <span className="bg-accent text-[10px] font-semibold text-accent-foreground w-fit px-[6px] py-[2px] rounded-full text-center">
            5
          </span>
        </div>
      </div>
    );
  }
);
SidebarGroupItem.displayName = "SidebarGroupItem";
export default SidebarGroupItem;
