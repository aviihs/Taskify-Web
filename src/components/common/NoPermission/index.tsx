import { NO_PERMISSION_MESSAGE } from "@/constants/common-content";

export default function NoPermission() {
  return (
    <div className="text-foreground px-4 py-5">
      <h3>{NO_PERMISSION_MESSAGE}</h3>
    </div>
  );
}
