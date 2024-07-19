import { FC, forwardRef, HTMLAttributes, Ref } from "react";
import SidebarGroup from "./sidebar-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import { chatHrefConstructor, cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import SidebarGroupItem from "./sidebar-group-item";
import Link from "next/link";

type AllChatProps = HTMLAttributes<HTMLDivElement> & {};
const AllChats: FC<AllChatProps> = forwardRef(
  async (props: AllChatProps, ref: Ref<HTMLDivElement>) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const friends = await getFriendsByUserId(session.user.id);

    const { className, ...rest } = props;
    return (
      <SidebarGroup
        title="all chats"
        icon={
          <FontAwesomeIcon icon={Icons.commentDots} className="w-4 h-4 mr-2" />
        }
      >
        <div
          ref={ref}
          className={cn("flex flex-col items-center -mx-2", className)}
          {...rest}
        >
          {friends.map((friend) => (
            <Link
              key={friend.id}
              className="w-full"
              href={`/chat/${chatHrefConstructor(session.user.id, friend.id)}`}
            >
              <SidebarGroupItem user={friend} />
            </Link>
          ))}
        </div>
      </SidebarGroup>
    );
  }
);
AllChats.displayName = "AllChats";
export default AllChats;
