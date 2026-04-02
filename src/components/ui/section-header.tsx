import { cn } from '@/lib/utils/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/** Reusable section title with emerald accent underline */
export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        {title}
      </h2>
      {/* Emerald accent underline */}
      <div className={cn('h-1 w-16 bg-emerald-400 rounded-full mb-4', centered && 'mx-auto')} />
      {subtitle && (
        <p className="text-lg text-white/60 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
