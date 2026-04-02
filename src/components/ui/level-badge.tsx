import { cn } from '@/lib/utils/cn';

type Level = 'beginner' | 'intermediate' | 'advanced' | 'developer';

interface LevelBadgeProps {
  level: Level | string | null;
  className?: string;
}

const levelConfig: Record<Level, { label: string; classes: string }> = {
  beginner:     { label: 'Cơ Bản',     classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  intermediate: { label: 'Trung Cấp',  classes: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  advanced:     { label: 'Chuyên Sâu', classes: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  developer:    { label: 'Developer',  classes: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};

/** Color-coded badge for course difficulty level */
export function LevelBadge({ level, className }: LevelBadgeProps) {
  const config = level ? levelConfig[level as Level] : null;
  if (!config) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
