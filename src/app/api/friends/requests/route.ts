import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const requestIds = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[];
    if (requestIds.length < 1) {
      return NextResponse.json([]);
    }

    const incomingFriendRequests = await Promise.all(
      requestIds.map(async (senderId) => {
        const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
        const senderParsed = JSON.parse(sender) as User;
        return senderParsed;
      })
    );
    return NextResponse.json(incomingFriendRequests);
  } catch (err) {
    console.log(err);
    return new Response("Invalid request", { status: 400 });
  }
}
