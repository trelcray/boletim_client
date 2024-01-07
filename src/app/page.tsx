"use client";

import { useQuery } from "@tanstack/react-query";

import { Section } from "@/components/section";
import { fetchWrapper } from "@/services/fetch";

interface ResultProps {
  id: string;
  bimestre: string;
  disciplina: string;
  nota: number;
  criadoEm: string;
}

async function fetchData() {
  const response = await fetchWrapper<{ data: ResultProps[] }>("results", {
    cache: "no-store",
  });
  return response.data;
}

export default function Home() {
  const { data = [] } = useQuery({
    queryKey: ["results"],
    queryFn: fetchData,
  });

  return (
    <>
      <div className="my-16 flex flex-col gap-8">
        {["Bimestre 1", "Bimestre 2", "Bimestre 3", "Bimestre 4"].map(
          (bimester) => (
            <Section key={bimester} bimester={bimester} result={data} />
          )
        )}
      </div>
    </>
  );
}
