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
      <div ref={ref} className={cn(className)} {...rest}>
        <h3
          aria-label={title}
          className="text-accent font-black text-lg items-center flex capitalize"
        >
          {icon}
          {title}
        </h3>
        <div className="mt-2 w-full">{children}</div>
      </div>
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
export default SidebarGroup;
