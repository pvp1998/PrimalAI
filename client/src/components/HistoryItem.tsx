import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar } from "lucide-react";

interface HistoryItemProps {
  thumbnail: string;
  title: string;
  date: string;
  score: number;
}

export function HistoryItem({ thumbnail, title, date, score }: HistoryItemProps) {
  return (
    <Card className="bg-card border-border/50 overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
      <CardContent className="p-0 flex">
        <div className="w-32 h-24 relative shrink-0">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-primary/90 text-primary-foreground p-2 rounded-full">
              <Play className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
        <div className="p-3 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-heading font-semibold text-foreground line-clamp-1">{title}</h4>
              <Badge variant={score >= 80 ? "default" : "secondary"} className={score >= 80 ? "bg-primary text-primary-foreground" : ""}>
                {score}
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {date}
            </div>
          </div>
          <div className="text-xs font-medium text-primary">View Analysis &rarr;</div>
        </div>
      </CardContent>
    </Card>
  );
}
