import { create } from "zustand";
import * as z from "zod";
import { BankDetailSchema } from "@/schemas";

export type ModalType =
  | "updateAccountNumber"
  | "openAdminNavigation"
  | "openMobileToggle";

type CreateOrUpdate = {
  value: z.infer<typeof BankDetailSchema>;
  accountName: string;
  userId: string;
};

interface ModalData {
  createOrUpdate?: CreateOrUpdate;
  isUpdate?: boolean;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  onUpdate: () => void;
  onUpdateClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  onUpdate: () =>
    set((state) => ({
      data: { ...state.data, isUpdate: true },
    })),
  onUpdateClose: () =>
    set((state) => ({
      data: { ...state.data, isUpdate: false },
    })),
}));
