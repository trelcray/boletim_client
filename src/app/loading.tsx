import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader2 className="h-20 w-20 animate-spin text-cyan-400" />
    </div>
  );
}
