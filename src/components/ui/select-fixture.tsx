import { FixtureType } from "@/shared/types";
import { SelectItem } from "./select";

interface SelectFixtureProps {
  value: FixtureType;
  children: React.ReactNode;
}

export default function SelectFixture({ value, children }: SelectFixtureProps) {
  return <SelectItem value={value}>{children}</SelectItem>;
}
