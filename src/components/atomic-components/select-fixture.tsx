import { FixtureType } from "@/shared/types";
import { SelectItem } from "../shadcn-ui/select";

interface SelectFixtureProps {
  value: FixtureType;
  children: React.ReactNode;
}

export function SelectFixture({ value, children }: SelectFixtureProps) {
  return <SelectItem value={value}>{children}</SelectItem>;
}
