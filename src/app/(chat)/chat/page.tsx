import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

type ChatProps = {};
const Chat: FC<ChatProps> = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="p-4 w-full max-w-sm">
        <h4 className="text-primary font-black text-2xl">
          Hi there, <span className="text-accent">{session.user.name}</span>
        </h4>
        <p className="text-sm mt-2 text-foreground">
          Click on one of your friend&apos;s from the sidebar to start messaging
          them...
        </p>
      </div>
    </div>
  );
};
export default Chat;
