import { CreateUserForm } from "@/components/users/create-form";

export default function CreateUserPage() {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <CreateUserForm />
      </div>
    </div>
  );
}
