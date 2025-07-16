"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Card, CardTitle } from "@/components/shadcn-ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="px-4 py-8">
        <CardTitle>Ha sucedido un error inesperado</CardTitle>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Volver a intentar
        </Button>
      </Card>
    </div>
  );
}
