import { z } from "zod";

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  content: z.string(),
  timestamp: z.number(),
  chatId: z.string().optional(),
});

export const messageArrayValidator = z.array(messageValidator);
export type Message = z.infer<typeof messageValidator>;
