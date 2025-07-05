import ReturnButton from "@/components/buttons/ReturnButton";

export default function AdminUsersPage() {
  return (
    <div className="mx-auto px-4 md:px-8 max-w-7xl py-2">
      <ReturnButton href="/dashboard/admin">Volver</ReturnButton>
      <h1>Admin Users Page</h1>
    </div>
  );
}
