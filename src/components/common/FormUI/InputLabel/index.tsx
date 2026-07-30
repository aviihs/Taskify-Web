import ToolTip from "@/components/common/ToolTip";
import { cn } from "@/lib/utils";

interface InputLabelProps {
  label: string;
  tooltipMessage?: string;
  asterisk?: boolean;
  disabled?: boolean;
}

export default function InputLabel({
  label,
  tooltipMessage,
  asterisk,
  disabled,
}: InputLabelProps) {
  return (
    <div
      className={cn("flex h-5 items-center", {
        "text-muted-foreground/80": disabled,
      })}
    >
      <p className="text-foreground">{label}</p>
      {asterisk ? <span className="text-destructive">&nbsp;*</span> : null}
      <div className="ml-1">
        {tooltipMessage ? (
          <ToolTip name="lucide:info" message={tooltipMessage} />
        ) : null}
      </div>
    </div>
  );
}
