import { FC, HTMLAttributes } from "react";
import { Input } from "./ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "@/lib/icons";
import AllChats from "./all-chats";

type SidebarProps = HTMLAttributes<HTMLDivElement> & {};
const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className="flex w-72 border-r flex-col h-screen bg-background">
      <div className="px-4 py-5 border-b">
        <div className="relative">
          <Input
            placeholder="Search..."
            className="h-[39px] bg-muted-foreground text-foreground placeholder:text-foreground rounded-lg"
          />
          <FontAwesomeIcon
            icon={Icons.magnifyingGlass}
            className="absolute top-1/2 right-3 -translate-y-2/4 w-4 h-4"
          />
        </div>
      </div>
      <AllChats />
    </div>
  );
};
export default Sidebar;
