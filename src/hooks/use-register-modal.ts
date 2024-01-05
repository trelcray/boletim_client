import { create } from "zustand";

interface IuseRegisterModalStore {
  isOpen: boolean;
  currentBimester: string | null;
  onOpen: (bimester: string) => void;
  onClose: () => void;
}

export const useRegisterModal = create<IuseRegisterModalStore>((set) => ({
  isOpen: false,
  currentBimester: null,
  onOpen: (bimester) => set({ isOpen: true, currentBimester: bimester }),
  onClose: () => set({ isOpen: false, currentBimester: null }),
}));
