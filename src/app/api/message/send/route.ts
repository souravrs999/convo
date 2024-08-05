import { NextRequest } from "next/server";
import { getServerSession, User } from "next-auth";

import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { Message, messageValidator } from "@/lib/validations/message";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { content, chatId }: { content: string; chatId: string } =
      await req.json();

    if (!chatId)
      return new Response("ChatID is a required param", { status: 404 });

    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const [userId1, userId2] = chatId.split("--");
    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("Unauthorized", { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;
    const [friendList, rawSender]: [string[], string] = await Promise.all([
      fetchRedis("smembers", `user:${session.user.id}:friends`),
      fetchRedis("get", `user:${session.user.id}`),
    ]);

    const isFriend = friendList.includes(friendId);
    if (!isFriend) {
      return new Response("Unauthorized", { status: 401 });
    }

    const timestamp: number = Date.now();
    const sender = JSON.parse(rawSender) as User;
    const messageData: Message = {
      id: nanoid(),
      content,
      senderId: session.user.id,
      timestamp,
    };
    const message = messageValidator.parse(messageData);

    Promise.all([
      pusherServer.trigger(
        toPusherKey(`chat:${chatId}`),
        "incoming-message",
        message
      ),
      pusherServer.trigger(
        toPusherKey(`user:${friendId}:chats`),
        "new_message",
        {
          ...message,
          sender,
        }
      ),
      db.zadd(`chat:${chatId}:messages`, {
        score: timestamp,
        member: JSON.stringify(message),
      }),
    ]);
    return new Response("OK");
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
