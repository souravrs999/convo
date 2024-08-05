"use client";
import { Button } from "./ui/button";
import { Icons } from "@/lib/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="shrink-0 bg-white hover:bg-white/40 text-foreground hover:text-accent w-8 h-8 rounded-lg grid place-items-center"
    >
      <FontAwesomeIcon className="w-5 h-5" icon={Icons.rightFromBracket} />
    </Button>
  );
}
