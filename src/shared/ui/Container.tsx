import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ className, children }: Props) {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
}
