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
        <div className="flex items-start w-full">
          <h4 className="text-md font-black text-foreground capitalize px-4 py-2">
            <FontAwesomeIcon
              icon={Icons.message}
              className="text-foreground mr-2"
            />
            All chat
          </h4>
        </div>
        {friends?.map((friend) => (
          <Link
            key={friend.id}
            className="w-full"
            href={`/chat/${chatHrefConstructor(user?.id!, friend.id)}`}
          >
            <SidebarGroupItem user={friend} />
          </Link>
        ))}
      </div>
    );
  }
);
AllChats.displayName = "AllChats";
export default AllChats;
