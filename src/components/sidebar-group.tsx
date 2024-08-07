import { cn } from "@/lib/utils";
import React, { Ref, forwardRef, FC, HTMLAttributes, ReactNode } from "react";

type SidebarGroupProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  icon?: ReactNode;
};
const SidebarGroup: FC<SidebarGroupProps> = forwardRef(
  (props: SidebarGroupProps, ref: Ref<HTMLDivElement>) => {
    const { children, title, icon, className, ...rest } = props;
    return (
      <div ref={ref} className={cn("w-full", className)} {...rest}>
        <h3
          aria-label={title}
          className="text-foreground font-black items-center flex capitalize px-4 py-2"
        >
          {icon}
          {title}
        </h3>
        <div className="w-full">{children}</div>
      </div>
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
export default SidebarGroup;
