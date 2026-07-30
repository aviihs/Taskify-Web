import Icon from "@/components/common/icon";
import { SPINNER_LOADING_LABEL } from "@/constants/common-content";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div role="status" className="flex items-center">
      <Icon
        name="lucide:loader-circle"
        className={cn(
          "text-primary animate-spin cursor-default lg:text-lg",
          className
        )}
      />
      <span className="sr-only">{SPINNER_LOADING_LABEL}</span>
    </div>
  );
}
