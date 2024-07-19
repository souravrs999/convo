import { cn } from "@/lib/utils";
import Image from "next/image";
import SidebarFooter from "./sidebar-footer";
import AddUser from "./add-friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import SidebarGroup from "./sidebar-group";
import FriendRequests from "./friend-requests";
import AllChats from "./all-chats";

type Chat = {
  id: number;
  user: string;
  message: string;
  read: boolean;
  time: string;
  active: boolean;
  typing?: boolean;
  notificationCount: number | null;
};

const pinnedChats: Chat[] = [
  {
    id: 1,
    user: "George Lobko",
    message: "Thanks for the quick response.",
    read: true,
    time: "09:41",
    active: false,
    notificationCount: null,
  },
  {
    id: 2,
    user: "Amelia Korns",
    message: "I'm stuck in traffic, but will make it to the meeting.",
    read: false,
    time: "21:25",
    active: true,
    notificationCount: 2,
  },
  {
    id: 3,
    user: "Arnold Linkoln",
    message: "Great job on the presentation, keep it up.",
    read: true,
    time: "18:17",
    active: false,
    notificationCount: null,
  },
];

const allChats: Chat[] = [
  {
    id: 1,
    user: "Hasima Medvedeva",
    message: "",
    read: true,
    time: "12:23",
    active: true,
    typing: true,
    notificationCount: 1,
  },
  {
    id: 2,
    user: "Nixito Team",
    message: "",
    read: true,
    time: "12:13",
    active: true,
    typing: true,
    notificationCount: null,
  },
  {
    id: 3,
    user: "Anatoly Ferusso",
    message: "Sorry for the delay. I'll be closing it soon.",
    read: true,
    time: "11:53",
    active: false,
    notificationCount: null,
  },
];

function MessageGroup({
  title,
  chats,
  icon,
}: {
  title: string;
  chats: Chat[];
  icon: IconDefinition;
}) {
  return (
    <div className="flex flex-col my-2 -mx-3">
      <h3 className="text-accent font-black text-lg items-center flex ml-2 capitalize">
        <FontAwesomeIcon icon={icon} className="mr-2 w-4 h-4" />
        {title}
      </h3>
      <ul className="flex flex-col mt-2 w-full items-center">
        {chats?.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
}

function MessageItem({ message }: { message: Chat }) {
  return (
    <li className="flex gap-2 w-full py-4 px-2 hover:bg-[#fbf3ff] rounded-xl cursor-pointer">
      <div className="relative shrink-0">
        <Image
          src="https://xsgames.co/randomusers/avatar.php?g=male"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <span
          className={cn(
            "absolute w-2 h-2 bg-gray-400 outline outline-[2px] outline-white rounded-full top-0 right-0",
            {
              "bg-green-500": message.active,
            }
          )}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <h4 className="text-accent font-semibold text-sm">{message.user}</h4>
        <p
          className={cn("text-xs text-[#92809b] truncate whitespace-nowrap", {
            "text-accent font-semibold": !message.read,
          })}
        >
          {message.typing ? (
            <span>
              <strong className="font-semibold text-accent">
                {message.user}
              </strong>{" "}
              is typing ...
            </span>
          ) : (
            message.message
          )}
        </p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <span className="text-xs text-[#92809b]">{message.time}</span>
        {message.notificationCount ? (
          <span className="bg-accent text-[10px] font-semibold text-accent-foreground w-fit px-[6px] py-[2px] rounded-full text-center">
            {message.notificationCount}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-[300px] bg-white p-[20px] border-r-[1px] border-[#e0e0e0] gap-4">
      <div className="flex justify-between">
        <h3 className="text-accent font-black text-xl">Messages</h3>
        <AddUser />
      </div>
      <FriendRequests />
      <div className="relative w-full my-2">
        <input
          type="text"
          placeholder="Search or start of message"
          className="bg-[#f1f0f3] p-4 rounded-lg text-xs text-[#a99bb4] w-full"
        />
        <span className="absolute bg-[#a99bb4] w-4 h-4 top-1/3 right-4" />
      </div>
      <AllChats />
      <div className="flex flex-1 flex-col">
        <MessageGroup
          icon={Icons.thumbtack}
          title="pinned chats"
          chats={pinnedChats}
        />
        <MessageGroup
          icon={Icons.commentDots}
          title="all chats"
          chats={allChats}
        />
      </div>
      <SidebarFooter />
    </div>
  );
}
