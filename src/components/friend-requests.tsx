import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession, User } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import FriendRequestItem from "./friend-request-item";
import SidebarGroup from "./sidebar-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";

const MAX_VISIBLE_REQUESTS = 4;

type FriendRequestProps = HTMLAttributes<HTMLDivElement> & {};
const FriendRequests: FC<FriendRequestProps> = forwardRef(
  async (props: FriendRequestProps, ref: Ref<HTMLDivElement>) => {
    const { children, className, ...rest } = props;

    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const incomingSenderIds = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    if (incomingSenderIds.length < 1) {
      return null;
    }

    const incomingFriendRequests = await Promise.all(
      incomingSenderIds.map(async (senderId) => {
        const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
        const senderParsed = JSON.parse(sender) as User;
        return senderParsed;
      })
    );

    return (
      <SidebarGroup
        title="friend requests"
        icon={
          <FontAwesomeIcon className="w-4 h-4 mr-2" icon={Icons.userGroup} />
        }
      >
        <div
          ref={ref}
          className={cn("flex gap-2 items-center", className)}
          {...rest}
        >
          {incomingFriendRequests
            ?.slice(0, MAX_VISIBLE_REQUESTS)
            ?.map((request, idx) => (
              <FriendRequestItem key={request.id} sender={request} />
            ))}
          {incomingFriendRequests.length > MAX_VISIBLE_REQUESTS && (
            <div className={cn("p-[5px] w-[50px] h-full rounded-xl bg-accent")}>
              <Image
                src={incomingFriendRequests[MAX_VISIBLE_REQUESTS].image!}
                alt={`${
                  incomingFriendRequests?.length - MAX_VISIBLE_REQUESTS
                } more`}
                width={40}
                height={40}
                className="rounded-xl"
              />
              <p className="truncate text-xs font-semibold text-accent-foreground my-1 text-center">
                +{incomingFriendRequests?.length - MAX_VISIBLE_REQUESTS}
              </p>
            </div>
          )}
        </div>
      </SidebarGroup>
    );
  }
);
FriendRequests.displayName = "FriendRequests";
export default FriendRequests;
