import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
