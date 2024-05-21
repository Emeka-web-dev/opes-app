import { Session } from "next-auth";
import { create } from "zustand";

export type StoreType = "userCurrentUser";

interface StoreData {
  currentUser?: Session | null;
}
interface StoreProps {
  type: StoreType | null;
  data: StoreData;
  setData: (type: StoreType, data?: StoreData) => void;
}

export const useStore = create<StoreProps>((set) => ({
  type: null,
  data: {},
  setData: (type, data = {}) => set({ type, data }),
}));
