import AdminForm from "@/components/AdminForm";
import FormWrapper from "@/components/FormWrapper";
import ReturnLink from "@/components/Return";

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
