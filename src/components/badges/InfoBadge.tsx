import { Badge } from "../shadcn-ui/badge";

export default function InfoBadge({ children }: { children: React.ReactNode }) {
  return <Badge className="bg-neutral-800">{children}</Badge>;
}
