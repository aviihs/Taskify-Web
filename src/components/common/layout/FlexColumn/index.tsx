import { cn, gapToRem } from "@/lib/utils";

import { FlexContainerProps } from "../types";

export default function FlexColumn({
  className = "",
  children,
  gap,
  style,
  ...rest
}: FlexContainerProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{
        gap: gapToRem(gap),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
