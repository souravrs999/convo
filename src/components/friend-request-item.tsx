"use client";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import axios from "axios";
import { useRouter } from "next/navigation";

type FriendRequestItemProps = HTMLAttributes<HTMLDivElement> & {
  sender: User;
};
const FriendRequestItem: FC<FriendRequestItemProps> = forwardRef(
  (props: FriendRequestItemProps, ref: Ref<HTMLDivElement>) => {
    const { children, sender, className, ...rest } = props;
    const router = useRouter();

    const acceptFriend = async () => {
      await axios.post("/api/friends/accept", { id: sender.id });
      router.refresh();
    };

    const denyFriend = async () => {
      await axios.post("/api/friends/deny", { id: sender.id });
      router.refresh();
    };

    return (
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "relative p-[5px] w-[50px] rounded-xl bg-light-red cursor-pointer",
              className
            )}
            {...rest}
          >
            <Image
              src={sender.image!}
              alt={sender.name!}
              width={40}
              height={40}
              className="rounded-xl"
            />
            <p className="truncate text-xs font-semibold text-accent my-1 text-center">
              {sender.name}
            </p>
            <span className="absolute -top-[2px] -right-[2px] bg-green-500 w-2 h-2 outline outline-[2px] rounded-full outline-white" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="w-fit p-4 rounded-2xl">
          <h3 className="text-accent font-bold">Accept friend request</h3>
          <div className="flex gap-2 mt-2">
            <Image
              src={sender.image!}
              alt={sender.name!}
              width={40}
              height={40}
              className="rounded-xl"
            />
            <div className="flex flex-col items-start">
              <p className="truncate text-sm font-semibold text-accent text-center">
                {sender.name}
              </p>
              <p className="truncate text-xs text-accent text-center">
                {sender.email}
              </p>
            </div>
            <div className="flex w-full gap-2 ml-2">
              <Button
                size="icon"
                className="bg-light-green text-accent hover:bg-light-green/50"
                onClick={acceptFriend}
              >
                <FontAwesomeIcon icon={Icons.check} />
              </Button>
              <Button
                size="icon"
                className="bg-light-red text-accent hover:bg-light-red/50"
                onClick={denyFriend}
              >
                <FontAwesomeIcon icon={Icons.xMark} />
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }
);
FriendRequestItem.displayName = "FriendRequestItem";
export default FriendRequestItem;
