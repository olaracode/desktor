import { CrossIcon } from "lucide-react";
export default function Home() {
  return (
    <main>
      <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="flex items-center gap-2 font-semibold">
          <CrossIcon className="h-6 w-6 animate-spin" />
          <span className="">MediCare</span>
        </div>
      </div>
    </main>
  );
}
