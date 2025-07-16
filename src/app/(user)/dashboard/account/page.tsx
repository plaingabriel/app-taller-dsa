import { EditUserForm } from "@/components/users/edit-form";
import { fetchAuthUser } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await fetchAuthUser();

  if (!user) return redirect("/login");

  return (
    <div className="grow flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <EditUserForm user={user} />
      </div>
    </div>
  );
}
