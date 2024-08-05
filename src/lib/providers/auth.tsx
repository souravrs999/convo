"use client";
import { ReactNode, FC, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useBoundStore } from "@/lib/store";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  const setUser = useBoundStore((state) => state.setUser);
  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session.data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);
  return <>{children}</>;
};
export default AuthProvider;
