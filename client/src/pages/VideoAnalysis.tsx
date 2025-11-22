import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Play, Pause, Volume2, Maximize2, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Issue {
  id: number;
  title: string;
  severity: 'critical' | 'medium' | 'low';
  start: number; // seconds
  end: number;
  description: string;
}

const issues: Issue[] = [
  {
    id: 1,
    title: "Bent Elbows",
    severity: "critical",
    start: 2,
    end: 5,
    description: "Keep arms fully locked out to maximize structural support."
  },
  {
    id: 2,
    title: "Arched Back",
    severity: "medium",
    start: 6,
    end: 9,
    description: "Engage core to maintain a hollow body position (posterior pelvic tilt)."
  },
  {
    id: 3,
    title: "Head Position",
    severity: "low",
    start: 10,
    end: 12,
    description: "Look between your hands, not excessively forward or back."
  },
  {
    id: 4,
    title: "Toe Point",
    severity: "low",
    start: 13,
    end: 15,
    description: "Point toes for better tension throughout the kinetic chain."
  }
];

export default function VideoAnalysis() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIssueId, setActiveIssueId] = useState<number | null>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const videoDuration = 15; // simulated 15s video

  const handleIssueClick = (issue: Issue) => {
    setActiveIssueId(issue.id);
    setCurrentTime(issue.start);
    setIsPlaying(true);
    // In real app, seek video to issue.start
  };

  useEffect(() => {
    if (isPlaying) {
        const interval = setInterval(() => {
            setCurrentTime(prev => (prev >= videoDuration ? 0 : prev + 0.1));
        }, 100);
        return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <Layout>
      <div className="flex-1 flex flex-col h-screen bg-black text-white">
        
        {/* Top Half: Video Player */}
        <div className="relative h-[50vh] bg-slate-900 flex flex-col">
          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setLocation("/results")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <span className="font-medium text-sm">Handstand Analysis</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Video Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden group">
            {/* Placeholder for video content */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
            
            {/* Skeleton / Skeleton Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                 {/* Simulated skeleton lines */}
                 <line x1="50" y1="80" x2="50" y2="50" stroke="#F59E0B" strokeWidth="0.5" />
                 <line x1="50" y1="50" x2="40" y2="30" stroke="#F59E0B" strokeWidth="0.5" />
                 <line x1="50" y1="50" x2="60" y2="30" stroke="#F59E0B" strokeWidth="0.5" />
                 <circle cx="50" cy="20" r="2" fill="#F59E0B" />
            </svg>

            {/* Play Button Overlay */}
            {!isPlaying && (
                <Button 
                    size="icon" 
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50 z-20"
                    onClick={() => setIsPlaying(true)}
                >
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                </Button>
            )}
          </div>

          {/* Controls & Timeline */}
          <div className="bg-black/80 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
               <span>{currentTime.toFixed(1)}s</span>
               <span>{videoDuration.toFixed(1)}s</span>
            </div>
            
            {/* Timeline */}
            <div className="relative h-8 w-full flex items-center">
                {/* Track */}
                <div className="absolute inset-x-0 h-1 bg-slate-700 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(currentTime / videoDuration) * 100}%` }} 
                     />
                </div>
                
                {/* Scrubber */}
                <div 
                    className="absolute h-4 w-1 bg-white rounded shadow-lg cursor-pointer"
                    style={{ left: `${(currentTime / videoDuration) * 100}%` }}
                />

                {/* Issue Markers */}
                {issues.map((issue) => (
                    <div 
                        key={issue.id}
                        className={cn(
                            "absolute w-3 h-3 rounded-full border border-black cursor-pointer hover:scale-125 transition-transform z-10",
                            issue.severity === 'critical' ? "bg-red-500" : 
                            issue.severity === 'medium' ? "bg-orange-500" : "bg-yellow-500"
                        )}
                        style={{ left: `${(issue.start / videoDuration) * 100}%` }}
                        onClick={(e) => { e.stopPropagation(); handleIssueClick(issue); }}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-6">
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsPlaying(!isPlaying)}>
                   {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
            </div>
          </div>
        </div>

        {/* Bottom Half: Issues Carousel */}
        <div className="flex-1 bg-white text-slate-900 flex flex-col overflow-hidden rounded-t-3xl -mt-4 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
           <div className="p-6 pb-2">
              <h3 className="text-lg font-heading font-bold">Analysis Breakdown</h3>
              <p className="text-sm text-muted-foreground">4 issues detected in your form</p>
           </div>

           <div className="flex-1 overflow-x-auto overflow-y-hidden pb-6 px-6 flex items-center gap-4 snap-x">
              {issues.map((issue) => (
                  <div 
                    key={issue.id}
                    onClick={() => handleIssueClick(issue)}
                    className={cn(
                        "min-w-[280px] h-48 bg-white rounded-2xl p-5 border-2 snap-center cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md",
                        activeIssueId === issue.id 
                            ? "border-primary ring-4 ring-primary/10 scale-105" 
                            : "border-slate-100 opacity-80 hover:opacity-100"
                    )}
                  >
                      <div className="flex justify-between items-start">
                          <div className={cn(
                              "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                              issue.severity === 'critical' ? "bg-red-100 text-red-600" : 
                              issue.severity === 'medium' ? "bg-orange-100 text-orange-600" : "bg-yellow-100 text-yellow-600"
                          )}>
                              {issue.severity}
                          </div>
                          <div className="text-xs font-mono text-slate-400">
                              {issue.start}s - {issue.end}s
                          </div>
                      </div>
                      
                      <div>
                          <h4 className="font-bold text-lg mb-2">{issue.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                              {issue.description}
                          </p>
                      </div>

                      <div className="flex justify-end">
                          <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                              activeIssueId === issue.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                          )}>
                              <Play className="w-3 h-3 ml-0.5" />
                          </div>
                      </div>
                  </div>
              ))}
              <div className="min-w-[20px]" /> {/* Spacer */}
           </div>
        </div>

      </div>
    </Layout>
  );
}
