"use client";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import { User } from "next-auth";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useBoundStore } from "@/lib/store";
import { chatHrefConstructor, cn } from "@/lib/utils";
import SidebarGroupItem from "./sidebar-group-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import SidebarGroup from "./sidebar-group";

type AllChatProps = HTMLAttributes<HTMLDivElement> & {};
const AllChats: FC<AllChatProps> = forwardRef(
  (props: AllChatProps, ref: Ref<HTMLDivElement>) => {
    const user = useBoundStore((state) => state.user);

    const { data: friends } = useQuery<User[]>({
      queryKey: ["FRIENDS_LIST"],
      queryFn: async () => {
        const res = await axios.post("/api/friends/my-friends", {
          userId: user?.id,
        });
        return res.data;
      },
      enabled: !!user?.id,
    });

    const { className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...rest}
      >
        <SidebarGroup
          title="All chat"
          icon={
            <FontAwesomeIcon icon={Icons.message} className="mr-2 w-4 h-4" />
          }
        >
          {friends && friends?.length < 1 && (
            <div className="flex items-center gap-4 p-4 bg-muted-foreground">
              <span className="w-10 h-10 rounded-full bg-accent shrink-0 grid place-items-center text-muted-foreground">
                <FontAwesomeIcon icon={Icons.info} />
              </span>
              <p className="text-xs">
                Looks like there&apos;s no one here
                <br />
                Add some friends to chat with them.
              </p>
            </div>
          )}
          {friends?.map((friend) => (
            <Link
              key={friend.id}
              className="w-full"
              href={`/chat/${chatHrefConstructor(user?.id!, friend.id)}`}
            >
              <SidebarGroupItem user={friend} />
            </Link>
          ))}
        </SidebarGroup>
      </div>
    );
  }
);
AllChats.displayName = "AllChats";
export default AllChats;
