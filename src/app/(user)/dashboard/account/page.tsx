import CredentialsForm from "@/components/forms/CredentialsForm";

export default function AccountPage() {
  return (
    <div className="grow flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <CredentialsForm />
      </div>
    </div>
  );
}
