import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          {eyebrow}
        </div>
      )}
      {/* Smaller base size on mobile, original sizes retained for larger screens */}
      <h2 className={cn("mt-3 text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900")}>{title}</h2>
      {subtitle && (
        <p className="mt-2 text-xs sm:text-base text-gray-800 max-w-2xl font-semibold mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
