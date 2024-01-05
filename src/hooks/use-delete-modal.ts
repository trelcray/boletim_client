import { create } from "zustand";

interface IuseDeleteModalStore {
  isOpen: boolean;
  currentId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteModal = create<IuseDeleteModalStore>((set) => ({
  isOpen: false,
  currentId: null,
  onOpen: (id) => set({ isOpen: true, currentId: id }),
  onClose: () => set({ isOpen: false, currentId: null }),
}));
