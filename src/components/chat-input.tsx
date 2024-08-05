"use client";
import { FC, forwardRef, HTMLAttributes, Ref, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Icons } from "@/lib/icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import axios from "axios";
import { Textarea } from "./ui/textarea";

type ChatInputProps = HTMLAttributes<HTMLDivElement> & {
  chatPartner: User;
  chatId: string;
};
const ChatInput: FC<ChatInputProps> = forwardRef(
  (props: ChatInputProps, ref: Ref<HTMLDivElement>) => {
    const { className, chatPartner, chatId, ...rest } = props;
    const [value, setValue] = useState<string>("");

    const handleMsgSend = () => {
      try {
        axios.post("/api/message/send", { content: value, chatId });
      } catch (err) {
        console.log("Something went wrong");
      }
      setValue("");
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex items-center gap-2 px-6 py-3 bg-white",
          className
        )}
        {...rest}
      >
        <div className="w-full relative">
          <FontAwesomeIcon
            icon={Icons.paperclip}
            className="absolute w-4 h-4 text-primary top-1/2 -translate-y-2/4 left-4"
          />
          <Textarea
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleMsgSend();
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            rows={1}
            placeholder="Your message"
            className="p-3 h-12 min-h-12 bg-muted-foreground rounded-lg text-primary placeholder:text-foreground font-medium px-10 border-muted-foreground resize-none"
          />
          <FontAwesomeIcon
            icon={Icons.microphone}
            className="absolute w-4 h-4 text-primary top-1/2 -translate-y-2/4 right-4"
          />
        </div>
        <Button onClick={handleMsgSend} size="icon" className="h-12 w-12">
          <FontAwesomeIcon icon={Icons.paperPlane} className="w-5 h-5" />
        </Button>
      </div>
    );
  }
);
ChatInput.displayName = "ChatInput";
export default ChatInput;
