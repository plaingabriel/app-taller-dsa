import AdminForm from "@/src/ui/AdminForm";
import ReturnLink from "@/src/ui/Return";
import FormWrapper from "@ui/FormWrapper";

export default function AdminPage() {
  return (
    <>
      <ReturnLink href="/dashboard/users" text="← Volver" />

      <FormWrapper>
        <h1>Actualizar Administrador</h1>
        <AdminForm />
      </FormWrapper>
    </>
  );
}
