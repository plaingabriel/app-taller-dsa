export default function SubmitButton({
  text,
  logout = false,
}: {
  text: string;
  logout: boolean;
}) {
  console.log(logout);
  return (
    <button
      type="submit"
      className="w-full  text-white p-4 border-none rounded-[8px] text-[1.1rem] font-[600] cursor-pointer transition-colors duration-300 ease-in-out mb-6 bg-primary hover:bg-primary-dark"
    >
      {text}
    </button>
  );
}
