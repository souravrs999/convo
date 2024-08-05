import { StateCreator } from "zustand";
import { BoundedStoreType, sliceResetFns } from "../store";
import { User } from "next-auth";

export interface UserSlice {
  user?: User;
  setUser: (val: User) => void;
}

const initialUserState = {};

export const createUserSlice: StateCreator<
  BoundedStoreType,
  [["zustand/devtools", never]],
  [],
  UserSlice
> = (set) => {
  sliceResetFns.add(() => set(initialUserState));
  return {
    ...initialUserState,
    setUser: (val: User) => set({ user: val }, false, "SET_USER"),
  };
};
