"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode, FC } from "react";

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default UserProvider;
