"use client";
import { Button } from "./ui/button";
import { Icons } from "@/lib/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Preferences() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="w-full p-0 bg-white text-foreground hover:text-accent hover:bg-white"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={Icons.gear} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" side="right">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
