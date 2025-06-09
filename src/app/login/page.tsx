import LoginForm from "@ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="p-12 rounded-2xl shadow-medium w-full max-[400px] bg-white">
      <h1 className="mb-8">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
}
