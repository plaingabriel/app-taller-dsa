import CredentialsForm from "@/components/forms/CredentialsForm";
import { getUserByCI } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";

export default async function AccountPage() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <div className="grow flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <CredentialsForm name={user.name} />
      </div>
    </div>
  );
}
