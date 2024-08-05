import { StateCreator } from "zustand";
import { BoundedStoreType, sliceResetFns } from "../store";
import { Message } from "../validations/message";

export interface MessageSlice {
  messageQueue: Message[];
  pushToQueue: (item: Message) => void;
  shiftQueue: () => void;
  resetQueue: () => void;
}

const initialMessageState = {
  messageQueue: [],
};

export const createMessageSlice: StateCreator<
  BoundedStoreType,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  MessageSlice
> = (set) => {
  sliceResetFns.add(() => set(initialMessageState));
  return {
    ...initialMessageState,
    pushToQueue: (item) => {
      set(
        (state) => {
          state.messageQueue.push(item);
        },
        false,
        "PUSH_TO_MESSAGE_QUEUE"
      );
    },
    shiftQueue: () =>
      set(
        (state) => {
          state.messageQueue.shift();
        },
        false,
        "SHIFT_MESSAGE_QUEUE"
      ),
    resetQueue: () => set(initialMessageState, false, "RESET_MESSAGE_QUEUE"),
  };
};
