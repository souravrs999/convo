import { StateCreator } from "zustand";
import { BoundedStoreType, sliceResetFns } from "../store";

export interface ApplicationSlice {
  chatContextBarOpen: boolean;
  sidebarSearchTerm: string;
  toggleChatContextBarState: (value: boolean) => void;
  changeSidebarSearchTerm: (value: string) => void;
}

const initialApplicationState = {
  chatContextBarOpen: false,
  sidebarSearchTerm: "",
};

export const createApplicationSlice: StateCreator<
  BoundedStoreType,
  [["zustand/devtools", never]],
  [],
  ApplicationSlice
> = (set) => {
  sliceResetFns.add(() => set(initialApplicationState));
  return {
    ...initialApplicationState,
    toggleChatContextBarState: (val: boolean) =>
      set({ chatContextBarOpen: val }, false, "TOGGLE_CHAT_CONTEXT_BAR"),
    changeSidebarSearchTerm: (val: string) =>
      set({ sidebarSearchTerm: val }, false, "CHANGE_SIDEBAR_SEARCH_TERM"),
  };
};
