import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Share2, ChevronRight, PlayCircle, AlertTriangle, Info, CheckCircle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Results() {
  const [, setLocation] = useLocation();
  const [score, setScore] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animate score count up
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 82) {
          clearInterval(interval);
          setTimeout(() => setShowContent(true), 500);
          return 82;
        }
        return prev + 2; // Faster count
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
        
        {/* Header / Top Section */}
        <div 
          className={cn(
            "flex flex-col items-center justify-center p-6 transition-all duration-700 ease-out",
            showContent ? "pt-8 pb-6" : "h-screen pb-32"
          )}
        >
          {!showContent && (
             <h1 className="text-3xl font-heading font-bold mb-8 animate-in fade-in slide-in-from-bottom-4">Analysis Complete</h1>
          )}

          {/* Score Circle */}
          <div 
            className={cn(
               "rounded-full border-8 border-muted relative flex items-center justify-center transition-all duration-700",
               showContent ? "w-32 h-32 border-4" : "w-56 h-56 border-8"
            )}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth={showContent ? "6" : "8"}
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary stroke-current transition-all duration-1000 ease-out"
                strokeWidth={showContent ? "6" : "8"}
                strokeLinecap="round"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
                strokeDasharray="289.02652413026095"
                strokeDashoffset={289.02652413026095 - (score / 100) * 289.02652413026095}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className={cn("font-heading font-bold transition-all", showContent ? "text-3xl" : "text-6xl")}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
            </div>
          </div>

          {/* Post-Animation Header Content */}
          <div className={cn("text-center mt-4 space-y-1 transition-opacity duration-500", showContent ? "opacity-100" : "opacity-0 hidden")}>
            <h2 className="text-lg font-bold">Alex Strength <span className="text-muted-foreground font-normal">#4</span></h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              🎯 HANDSTAND ANALYSIS
            </Badge>
            <div className="flex flex-col gap-1 mt-2">
               <span className="text-sm font-medium text-green-600">📈 +5 points from last attempt</span>
               <span className="text-xs text-muted-foreground">📊 Better than 68% of users</span>
            </div>
          </div>
        </div>

        {/* Main Content Area (Fades In) */}
        <div className={cn("flex-1 px-6 pb-24 overflow-y-auto transition-all duration-700 delay-300", showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20")}>
          
          {/* Split Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Issues Summary */}
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" /> Issues
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500" /> Medium</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Low</span>
                  <span className="font-bold">1</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-muted-foreground" /> Breakdown
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Technique</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Power</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Stability</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Insight */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
               <div className="bg-green-100 p-2 rounded-full h-fit">
                 <CheckCircle className="w-5 h-5 text-green-600" />
               </div>
               <div>
                 <h4 className="font-bold text-green-800 text-sm">Great Body Alignment</h4>
                 <p className="text-xs text-green-700 mt-1 leading-relaxed">
                   Your shoulder-hip-ankle line is nearly perfect during the hold phase. Keep this up!
                 </p>
               </div>
            </div>
          </div>

        </div>

        {/* Fixed Bottom Actions */}
        <div className={cn("absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-border transition-all duration-700 delay-500", showContent ? "translate-y-0" : "translate-y-full")}>
           <div className="flex flex-col gap-3">
              <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" onClick={() => setLocation("/video-analysis")}>
                View Full Analysis <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="outline" className="w-full h-12 text-base font-medium border-border bg-white hover:bg-slate-50">
                <PlayCircle className="w-4 h-4 mr-2" /> Video Breakdown
              </Button>
           </div>
        </div>

      </div>
    </Layout>
  );
}
