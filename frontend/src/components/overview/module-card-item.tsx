import type { ReactNode } from "react";

import ModuleRing from "./module-ring";

type ModuleCardItemProps = {
  name: string;
  value: number;
  status: string;
  icon: ReactNode;
  strokeClass: string;
  textClass: string;
  borderClass: string;
};

export default function ModuleCardItem({
  name,
  value,
  status,
  icon,
  strokeClass,
  textClass,
  borderClass,
}: ModuleCardItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <ModuleRing value={value} strokeClass={strokeClass} />

      <div
        className={`mt-4 flex h-8 w-8 items-center justify-center rounded-full border ${borderClass} ${textClass}`}
      >
        {icon}
      </div>

      <p className="mt-3 text-sm font-bold text-foreground">{name}</p>
      <p className={`mt-1 text-xs font-extrabold ${textClass}`}>{status}</p>
    </div>
  );
}