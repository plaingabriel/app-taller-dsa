import { Input } from "../shadcn-ui/input";

interface Props {
  id: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  ref: React.RefObject<HTMLInputElement | null>;
}

export function FileUploadInput({ id, file, setFile, ref }: Props) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Input
      id={id}
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      className="mt-1"
      disabled={!!file}
      ref={ref}
    />
  );
}
