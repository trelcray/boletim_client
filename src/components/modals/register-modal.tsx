"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";

import { useRegisterModal } from "@/hooks/use-register-modal";
import { cn } from "@/lib/utils";
import { IErrorResponse, fetchWrapper } from "@/services/fetch";

import { Badge } from "../ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";

interface IRegisterModalProps {}

const disciplinas = ["Biologia", "Artes", "Geografia", "Sociologia"];

const formSchema = z.object({
  bimestre: z.string(),
  disciplina: z.enum(["Biologia", "Artes", "Geografia", "Sociologia"], {
    required_error: "você deve ao menos selecionar uma disciplina.",
  }),
  nota: z.coerce
    .number({
      required_error: "Você deve adicionar uma nota!",
      invalid_type_error: "Você deve adicionar uma nota válida!",
    })
    .min(0, "Nota mínima é 0.")
    .max(10, "Nota máxima é 10."),
});

export const RegisterModal: React.FC<IRegisterModalProps> = ({}) => {
  const [selectedBadge, setSelectedBadge] = useState<string>();

  const queryClient = useQueryClient();

  const bimesterMappings: Record<string, string> = {
    "Bimestre 1": "PRIMEIRO",
    "Bimestre 2": "SEGUNDO",
    "Bimestre 3": "TERCEIRO",
    "Bimestre 4": "QUARTO",
  };

  const currentBimester: string | null = useRegisterModal(
    (state) => state.currentBimester
  );
  const renameBimester = currentBimester
    ? bimesterMappings[currentBimester] || ""
    : "";
  const registerModal = useRegisterModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bimestre: renameBimester ?? "",
    },
  });

  const handleBadgeClick = (badge: string) => {
    setSelectedBadge(badge === selectedBadge ? "" : badge);

    form.setValue("bimestre", renameBimester);

    form.setValue(
      "disciplina",
      badge as "Biologia" | "Artes" | "Geografia" | "Sociologia"
    );
  };

  const fetchData = async (values: z.infer<typeof formSchema>) => {
    const response = await fetchWrapper<IErrorResponse>("result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.status === "error") {
      throw new Error(response.message ?? "Erro ao criar o resultado.");
    }

    return response;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => fetchData(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      toast.success("Registrado!");
      registerModal.onClose();
      form.reset();
    },
    onError: (error: Error) => {
      console.error("Erro na requisição:", error.message);
      toast.error(error.message ?? "Erro ao processar a requisição.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Modal
      disabled={isPending}
      title={currentBimester as string}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="flex flex-col gap-y-2">
          <h2 className="text-lg font-medium text-gray-50">Disciplina</h2>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-5 sm:justify-between">
            {disciplinas.map((item) => {
              return (
                <Badge
                  key={item}
                  className={cn("hover:opacity-90", {
                    "bg-pink-500": item === "Biologia",
                    "bg-green-900/20": item === "Artes",
                    "bg-orange-600/20": item === "Geografia",
                    "bg-purple-600/20": item === "Sociologia",
                    "ring-2 ring-ring ring-offset-2": selectedBadge === item,
                  })}
                  onClick={() => handleBadgeClick(item)}
                >
                  {item}
                </Badge>
              );
            })}

            <FormField
              control={form.control}
              name="disciplina"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nota"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <fieldset className="flex flex-col gap-2">
                    <FormLabel
                      htmlFor="nota"
                      className="text-sm font-normal text-gray-50"
                    >
                      Nota
                    </FormLabel>
                    <Input
                      id="nota"
                      type="text"
                      className="w-28 border-[#424242] bg-transparent text-center text-[#6D6D6D]"
                      placeholder=" "
                      {...field}
                      maxLength={3}
                      required
                    />
                  </fieldset>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};
