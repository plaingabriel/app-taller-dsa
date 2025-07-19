import { Download } from "lucide-react";
import { Button } from "../shadcn-ui/button";

export function DownloadCSV({
  csvContent,
  fileName,
}: {
  csvContent: string;
  fileName: string;
}) {
  const downloadTemplate = () => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" onClick={downloadTemplate}>
        <Download className="w-4 h-4 mr-2" />
        Descargar Plantilla CSV
      </Button>
      <span className="text-sm text-neutral-700">
        Descarga una plantilla de ejemplo
      </span>
    </div>
  );
}
