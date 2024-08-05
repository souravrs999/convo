import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { ApplicationSlice, createApplicationSlice } from "./slices/application";
import { createUserSlice, UserSlice } from "./slices/user";
import { createMessageSlice, MessageSlice } from "./slices/message";

export const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export interface BoundedStoreType
  extends ApplicationSlice,
    UserSlice,
    MessageSlice {}

export const useBoundStore = create<BoundedStoreType>()(
  devtools(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createMessageSlice(...a),
      ...createApplicationSlice(...a),
    }))
  )
);
