export default function Placeholder({
  label,
  className = "",
  dark = false,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center text-center px-4 ${
        dark
          ? "bg-white/5 border border-dashed border-white/20 text-white/30"
          : "bg-border-grey/40 border border-dashed border-border-grey text-warm-grey"
      } ${className}`}
    >
      <span className="text-xs">{label}</span>
    </div>
  );
}
