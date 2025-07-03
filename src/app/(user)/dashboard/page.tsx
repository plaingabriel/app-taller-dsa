import { getUserByCI } from "@/db/methods/user";
import { getUserCI } from "@/lib/session";

export default async function DashboardPage() {
  const userCI = await getUserCI();
  const user = await getUserByCI(userCI);

  return (
    <>
      <h1>Cargando...</h1>
    </>
  );
}
