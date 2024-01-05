"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center">
      <h2>Algum erro ocorreu!</h2>
      <Button onClick={() => handleReload()}>Tente Novamente</Button>
    </div>
  );
}
