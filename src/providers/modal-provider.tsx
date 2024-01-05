"use client";

import { DeleteModal } from "@/components/modals/delete-modal";
import { RegisterModal } from "@/components/modals/register-modal";

export const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <DeleteModal />
    </>
  );
};
