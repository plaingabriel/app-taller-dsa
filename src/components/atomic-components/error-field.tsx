export function ErrorField({ message }: { message: string }) {
  return <p className="text-danger-500 text-sm mt-2">{message}</p>;
}
