
import { cn } from "@/lib/utils";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </a>
    </nav>
  );
}
