import FormWrapper from "@ui/FormWrapper";
import LoginForm from "@ui/LoginForm";

export default function LoginPage() {
  return (
    <FormWrapper>
      <h1 className="mb-8">Iniciar Sesión</h1>
      <LoginForm />
    </FormWrapper>
  );
}
