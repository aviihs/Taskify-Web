import { cn, gapToRem } from "@/lib/utils";

import { FlexContainerProps } from "../types";

export default function FlexRow({
  className = "",
  children,
  gap,
  ...rest
}: FlexContainerProps) {
  return (
    <div
      className={cn("flex flex-row", className)}
      {...rest}
      style={{
        gap: gapToRem(gap),
      }}
    >
      {children}
    </div>
  );
}
