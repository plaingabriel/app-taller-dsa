import { type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { Button, buttonVariants } from "../shadcn-ui/button";

type AddButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default function AddButton({
  children,
  className,
  size,
  variant,
  ...props
}: AddButtonProps) {
  return (
    <Button {...{ className, size, variant, ...props }}>
      <Plus />
      {children}
    </Button>
  );
}
