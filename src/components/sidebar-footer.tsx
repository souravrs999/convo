import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "./logout-button";
import AddUser from "./add-friend";

export default async function SidebarFooter() {
  const session = await getServerSession();
  return (
    <div className="flex items-center gap-8 justify-between bg-white border-t -mx-5 pt-4 px-4">
      <div className="flex gap-2 items-center">
        <Image
          src={session?.user.image!}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <div className="flex flex-col truncate">
          <h3 className="text-sm text-accent font-semibold">
            {session?.user.name}
          </h3>
          <p className="text-xs truncate text-[#92809b]">
            {session?.user.email}
          </p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
