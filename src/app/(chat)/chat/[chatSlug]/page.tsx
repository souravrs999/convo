import { FC } from "react";
import { notFound } from "next/navigation";
import { getServerSession, User } from "next-auth";

import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";

import ChatHeader from "@/components/chat-header";
import { getChatMessages } from "@/helpers/get-chat-messages";
import ChatArea from "@/components/chat-area";
import ChatInput from "@/components/chat-input";
import DetailsBar from "@/components/details-bar";

type ChatRoomProps = {
  params: { chatSlug: string };
};
const ChatRoom: FC<ChatRoomProps> = async ({ params }) => {
  const { chatSlug } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const [userId1, userId2] = chatSlug.split("--");
  if (session.user.id !== userId1 && session.user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = session.user.id === userId1 ? userId2 : userId1;
  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;

  const currentUser = session.user as User;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;
  const initialMessages = await getChatMessages(chatSlug);

  return (
    <div className="flex-1 flex">
      <div className="flex flex-col w-full">
        <ChatHeader members={[chatPartner]} />
        <ChatArea
          initialMessages={initialMessages}
          currentUser={currentUser}
          chatId={chatSlug}
          chatPartner={chatPartner}
        />
        <ChatInput chatPartner={chatPartner} chatId={chatSlug} />
      </div>
      <DetailsBar chatPartner={chatPartner} />
    </div>
  );
};
ChatRoom.displayName = "ChatRoom";
export default ChatRoom;
