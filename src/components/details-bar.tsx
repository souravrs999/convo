"use client";
import { useBoundStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";

type DetailsBarProps = HTMLAttributes<HTMLDivElement> & { chatPartner: User };
const DetailsBar: FC<DetailsBarProps> = forwardRef(
  (props: DetailsBarProps, ref: Ref<HTMLDivElement>) => {
    const { chatPartner, className, ...rest } = props;
    const { chatContextBarOpen, toggleChatContextBarState } = useBoundStore(
      (state) => ({
        chatContextBarOpen: state.chatContextBarOpen,
        toggleChatContextBarState: state.toggleChatContextBarState,
      })
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-screen w-80 shrink-0 border-l p-4",
          { hidden: !chatContextBarOpen },
          className
        )}
        {...rest}
      >
        <div className="flex flex-col items-center w-full my-2">
          <Image
            src={chatPartner.image!}
            alt={chatPartner.name!}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h3 className="text-lg font-bold text-primary capitalize mt-2">
            {chatPartner.name}
          </h3>
          <p className="text-sm text-muted">{chatPartner.email}</p>
        </div>
        <span className="w-full h-[1px] bg-muted-foreground my-2" />
        <div className="my-2">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-primary">
              Photos and videos
            </h4>
            <p className="text-accent text-sm font-bold">See all</p>
          </div>
          <div className="grid gap-2 grid-cols-2 mt-2">
            {Array.from(new Array(6)).map((_, idx) => (
              <Image
                key={idx}
                src={`/dribbble-${idx + 1}.png`}
                alt="some image"
                width={200}
                height={200}
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
DetailsBar.displayName = "DetailsBar";
export default DetailsBar;
