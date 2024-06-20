import { auth } from "@/auth";
import { Session } from "next-auth";
import { create } from "zustand";

interface SessionState {
  session: Session | null;
  setSession: (session: any) => void;
  fetchSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  fetchSession: async () => {
    const session = await auth();
    set({ session });
  },
}));
