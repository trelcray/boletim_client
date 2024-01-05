import { KanbanSquare, Trash2 } from "lucide-react";

import { useDeleteModal } from "@/hooks/use-delete-modal";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface IInfoProps {
  id: string;
  disciplina: string;
  criadoEm: string;
  nota: number;
}

export const Info: React.FC<IInfoProps> = ({
  id,
  disciplina,
  criadoEm,
  nota,
}) => {
  const deleteModal = useDeleteModal();

  return (
    <Card
      className={cn({
        "bg-pink-500": disciplina === "Biologia",
        "bg-cyan-500": disciplina === "Artes",
        "bg-orange-600": disciplina === "Geografia",
        "bg-purple-600": disciplina === "Sociologia",
      })}
    >
      <Trash2
        className="absolute -right-6 top-0 h-7 w-6 cursor-pointer text-red-400 hover:text-red-500"
        onClick={() => deleteModal.onOpen(id)}
      />
      <CardTitle>{disciplina}</CardTitle>
      <CardDescription>{criadoEm}</CardDescription>
      <CardContent
        className={cn(
          "gap-1 pl-4 text-gray-100",
          {
            "text-red-400": nota < 6,
          },
          {
            "text-green-500": nota > 8,
          }
        )}
      >
        <KanbanSquare className={"h-4 w-4 rotate-180"} />
        <p className="text-sm font-medium">Nota: {nota}</p>
      </CardContent>
    </Card>
  );
};
