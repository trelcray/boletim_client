"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteModal } from "@/hooks/use-delete-modal";

import { Button } from "../ui/button";

export const DeleteModal = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentId = useDeleteModal((state) => state.currentId);
  const deleteModal = useDeleteModal();

  const onChange = (open: boolean) => {
    if (!open) {
      deleteModal.onClose();
    }
  };

  const handleResponse = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8081/result/${currentId}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (responseData.status === "error") {
        return toast.error(responseData.message ?? "Erro ao deletar.");
      }
      toast.success("Deletado!");
      deleteModal.onClose();
    } catch (error) {
      console.error("Erro na requisição:", (error as Error).message);
      toast.error(
        (error as Error).message ?? "Erro ao processar a requisição."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog modal open={deleteModal.isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar Resultado</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2">
            <div className="flex w-full flex-row justify-end gap-4">
              <Button
                size="lg"
                radius="xl"
                className="bg-red-400 hover:bg-red-500"
                disabled={isLoading}
                isLoading={isLoading}
                onClick={handleResponse}
              >
                <span className="text-base font-semibold text-gray-950">
                  Excluir
                </span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
