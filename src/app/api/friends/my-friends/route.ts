import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = z.object({ userId: z.string() }).parse(body);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const friendIds = (await fetchRedis(
      "smembers",
      `user:${userId}:friends`
    )) as string[];
    const friends = await Promise.all(
      friendIds.map(async (friendId) => {
        const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
        const parsedFriend = JSON.parse(friend) as User;
        return parsedFriend;
      })
    );
    return NextResponse.json(friends);
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
