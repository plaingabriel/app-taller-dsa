export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-full  text-white p-4 border-none rounded-[8px] text-[1.1rem] font-[600] cursor-pointer transition-colors duration-300 ease-in-out mb-6 bg-primary-500 hover:bg-primary-900"
    >
      {text}
    </button>
  );
}
