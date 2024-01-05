import { Suspense } from "react";

import { Section } from "@/components/section";

async function getData() {
  const res = await fetch("http://localhost:8081/results", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Falha ao buscar os dados");
  }
  return res.json();
}

export default async function Home() {
  const { data } = await getData();

  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <div className="flex flex-col gap-8">
          {["Bimestre 1", "Bimestre 2", "Bimestre 3", "Bimestre 4"].map(
            (bimester) => (
              <Section key={bimester} bimester={bimester} result={data} />
            )
          )}
        </div>
      </Suspense>
    </>
  );
}
