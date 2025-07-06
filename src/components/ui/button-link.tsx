import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Button, buttonVariants } from "./button";

type ButtonLinkProps = {
  href: string;
} & VariantProps<typeof buttonVariants> &
  React.ComponentProps<"button">;

export default function ButtonLink({
  className,
  variant,
  size,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Button
      asChild
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
