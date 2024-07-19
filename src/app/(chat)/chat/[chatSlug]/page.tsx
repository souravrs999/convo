import { FC } from "react";
import { notFound } from "next/navigation";
import { getServerSession, User } from "next-auth";

import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";

import ChatHeader from "@/components/chat-header";
import { getChatMessages } from "@/helpers/get-chat-messages";

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
  const chatPartner = JSON.parse(chatPartnerRaw) as User;
  const initialMessages = await getChatMessages(chatSlug);

  return (
    <div className="relative flex-1">
      <ChatHeader members={[chatPartner]} />
      <div className="relative h-full flex flex-col gap-6 max-h-screen overflow-y-auto">
        hi
      </div>
    </div>
  );
};
ChatRoom.displayName = "ChatRoom";
export default ChatRoom;
