"use client";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import SidebarGroup from "./sidebar-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "@/lib/store";
import axios from "axios";
import { Button } from "./ui/button";

type FriendRequestProps = HTMLAttributes<HTMLDivElement> & {};
const FriendRequests: FC<FriendRequestProps> = forwardRef(
  (props: FriendRequestProps, ref: Ref<HTMLDivElement>) => {
    const { children, className, ...rest } = props;
    const user = useBoundStore((state) => state.user);

    const queryClient = useQueryClient();
    const { data: friendRequests } = useQuery<User[]>({
      queryKey: ["INCOMING_FRIEND_REQUESTS"],
      queryFn: async () => {
        const res = await axios.get("/api/friends/requests");
        return res.data;
      },
      enabled: !!user,
    });

    const addFriendMutation = useMutation({
      mutationFn: async (id: string) =>
        await axios.post("/api/friends/accept", { id }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["FRIENDS_LIST"] }),
          queryClient.invalidateQueries({
            queryKey: ["INCOMING_FRIEND_REQUESTS"],
          });
      },
    });

    const removeFriendMutation = useMutation({
      mutationFn: async (id: string) =>
        await axios.post("/api/friends/deny", { id }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["FRIENDS_LIST"] }),
          queryClient.invalidateQueries({
            queryKey: ["INCOMING_FRIEND_REQUESTS"],
          });
      },
    });

    if (friendRequests && friendRequests?.length < 1) {
      return null;
    }

    return (
      <SidebarGroup
        title="friend requests"
        icon={
          <FontAwesomeIcon className="w-4 h-4 mr-2" icon={Icons.userGroup} />
        }
      >
        <div
          ref={ref}
          className={cn("flex flex-col gap-2 items-center", className)}
          {...rest}
        >
          {friendRequests?.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2 w-full p-3 cursor-pointer border-b"
            >
              <Image
                src={friend.image!}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-1 flex-col overflow-hidden ml-1 gap-2">
                <h4 className="text-primary text-sm font-bold capitalize">
                  {friend.name}
                </h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFriendMutation.mutate(friend.id)}
                    className="w-full hover:bg-muted-foreground hover:text-foreground border-muted-foreground"
                  >
                    Deny
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addFriendMutation.mutate(friend.id)}
                    className="w-full"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SidebarGroup>
    );
  }
);
FriendRequests.displayName = "FriendRequests";
export default FriendRequests;
