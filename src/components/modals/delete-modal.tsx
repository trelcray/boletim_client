"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { IErrorResponse, fetchWrapper } from "@/services/fetch";

import { Button } from "../ui/button";

export const DeleteModal = ({}) => {
  const queryClient = useQueryClient();

  const currentId = useDeleteModal((state) => state.currentId);
  const deleteModal = useDeleteModal();

  const onChange = (open: boolean) => {
    if (!open) {
      deleteModal.onClose();
    }
  };

  const fetchData = async () => {
    const response = await fetchWrapper<IErrorResponse>(`result/${currentId}`, {
      method: "DELETE",
    });

    if (response.status === "error") {
      throw new Error(response.message ?? "Erro ao deletar.");
    }

    return response;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: () => fetchData(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      toast.success("Deletado!");
      deleteModal.onClose();
    },
    onError: (error: Error) => {
      console.error("Erro na requisição:", error.message);
      toast.error(error.message ?? "Erro ao processar a requisição.");
    },
  });

  const handleResponse = () => {
    mutate();
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
                disabled={isPending}
                isLoading={isPending}
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
