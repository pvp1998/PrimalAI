import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ label, value, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("bg-card border-border/50 shadow-lg", className)}>
      <CardContent className="p-4 flex flex-col items-start justify-between h-full">
        <div className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2 flex items-center gap-2">
          {icon}
          {label}
        </div>
        <div className="text-2xl font-heading font-bold text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
