import { cn, gapToRem } from "@/lib/utils";

import { GridContainerProps } from "../types";

export default function Grid({
  className = "",
  children,
  cols,
  gap,
  ...rest
}: GridContainerProps) {
  return (
    <div
      className={cn("grid md:grid-cols-2", gap && "gap-x-2", className)}
      style={{
        gridTemplateColumns: cols ? `repeat(${cols}, minmax(0, 1fr))` : "",
        gap: gapToRem(gap),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
