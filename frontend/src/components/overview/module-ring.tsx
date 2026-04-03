type ModuleRingProps = {
  value: number;
  strokeClass: string;
};

export default function ModuleRing({ value, strokeClass }: ModuleRingProps) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-16 w-16">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted/60"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={strokeClass}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
        {value}%
      </div>
    </div>
  );
}