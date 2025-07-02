export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-12 rounded-2xl shadow-medium w-full max-[400px] bg-white">
      {children}
    </div>
  );
}
