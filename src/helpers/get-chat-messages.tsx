import { notFound } from "next/navigation";
import { fetchRedis } from "./redis";
import { Message, messageArrayValidator } from "@/lib/validations/message";

export const getChatMessages = async (chatId: string) => {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = results.map((message) => JSON.parse(message) as Message);
    const reversedMessages = dbMessages.reverse();
    const messages = messageArrayValidator.parse(reversedMessages);
    return messages;
  } catch (err) {
    notFound();
  }
};
