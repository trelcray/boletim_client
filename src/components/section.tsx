"use client";

import { Plus } from "lucide-react";

import { useRegisterModal } from "@/hooks/use-register-modal";
import { formatDate } from "@/utils/format-date";

import { Info } from "./info";
import { Button } from "./ui/button";

interface ISectionProps {
  bimester: string;
  result: {
    id: string;
    bimestre: string;
    disciplina: string;
    nota: number;
    criadoEm: string;
  }[];
}

export const Section: React.FC<ISectionProps> = ({ result, bimester }) => {
  const registerModal = useRegisterModal();

  const renameBimesters = [
    bimester === "Bimestre 1" && "PRIMEIRO",
    bimester === "Bimestre 2" && "SEGUNDO",
    bimester === "Bimestre 3" && "TERCEIRO",
    bimester === "Bimestre 4" && "QUARTO",
  ];

  return (
    <section className="px-9 lg:px-56">
      <div className="flex w-full justify-between">
        <h1>{bimester}</h1>
        <Button
          className="gap-2 px-4 py-2 text-black"
          radius="2xl"
          onClick={() => registerModal.onOpen(bimester)}
        >
          <span className="hidden text-base font-semibold sm:inline-block">
            Lançar nota
          </span>
          <Plus />
        </Button>
      </div>
      <div className="sm: mt-6 flex flex-wrap justify-center gap-9 md:justify-start lg:gap-20">
        {result &&
          result.map(
            (item) =>
              renameBimesters.some((rename) => rename === item.bimestre) && (
                <Info
                  key={item.id}
                  id={item.id}
                  criadoEm={formatDate(item.criadoEm)}
                  nota={item.nota}
                  disciplina={item.disciplina}
                />
              )
          )}
      </div>
    </section>
  );
};
