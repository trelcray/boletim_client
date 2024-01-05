"use client";

import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./button";

interface IModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children?: React.ReactNode;
  footer?: React.ReactElement;
  disabled?: boolean;
}

export const Modal: React.FC<IModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  footer,
  disabled,
  onSubmit,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  return (
    <div>
      <Dialog modal open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="relative flex-auto">{children}</div>
          <DialogFooter className="flex-col gap-2">
            <div className="flex w-full flex-row justify-end gap-4">
              <Button
                size="lg"
                radius="xl"
                disabled={disabled}
                isLoading={disabled}
                onClick={handleSubmit}
              >
                <span className="text-base font-semibold text-gray-950">
                  confirmar
                </span>
              </Button>
            </div>
            {footer}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
