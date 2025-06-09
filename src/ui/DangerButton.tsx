export default function DangerButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="bg-danger hover:bg-danger-hover text-white font-[600] py-3 px-6 rounded-3xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5"
    >
      {text}
    </button>
  );
}
