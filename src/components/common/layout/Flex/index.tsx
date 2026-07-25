import { cn, gapToRem } from "@/lib/utils";

import { FlexContainerProps } from "../types";

export default function Flex({
  className = "",
  children,
  gap,
  md,
  ...rest
}: FlexContainerProps) {
  let newClassNames = "";
  if (md) newClassNames += "md:flex-row ";

  return (
    <div
      className={cn("flex flex-col", newClassNames, className)}
      {...rest}
      style={{
        gap: gapToRem(gap),
      }}
    >
      {children}
    </div>
  );
}
