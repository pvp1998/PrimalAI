import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Share2, X, Activity, Zap, Shield, ArrowUpRight, ChevronRight, PlayCircle, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/lib/AnalysisContext";
import thumb from "@assets/generated_images/person_doing_a_handstand_on_yoga_mat.png";

export default function Results() {
  const [, setLocation] = useLocation();
  const { addAnalysis } = useAnalysis();
  const [score, setScore] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animation sequence
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 82) {
          clearInterval(interval);
          setTimeout(() => setShowContent(true), 300);
          
          // Add to history once animation completes
          addAnalysis({
            id: Date.now().toString(),
            title: "Handstand Analysis",
            date: "Just now",
            score: 82,
            thumbnail: thumb,
            skill: "Handstand"
          });
          
          return 82;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden bg-background text-foreground">
        
        {/* Top Navigation (Overlay) */}
        <div className="relative z-20 p-6 pb-2 flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-1">Calisthenics AI</p>
            <h1 className="text-2xl font-heading font-bold text-foreground">Handstand</h1>
          </div>
          <div className="flex gap-3">
            <Button size="icon" variant="ghost" className="rounded-full bg-black/5 hover:bg-black/10 text-foreground">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full bg-black/5 hover:bg-black/10 text-foreground"
              onClick={() => setLocation("/")}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Score Display - TOP SECTION */}
        <div className="relative z-10 px-8 pt-4 pb-6">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-7xl leading-none font-heading font-bold tracking-tighter text-foreground">
                {score}
              </span>
              <span className="text-2xl font-light text-muted-foreground mb-2">/100</span>
            </div>
            
            {/* Improvement Graph Circle - Repositioned to right */}
            <div className={cn(
              "w-28 h-28 transition-all duration-1000 delay-300",
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}>
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="45" stroke="currentColor" className="text-muted" strokeWidth="2" fill="none" />
                 <circle 
                   cx="50" cy="50" r="45" 
                   stroke="#22c55e" 
                   strokeWidth="4" 
                   fill="none" 
                   strokeDasharray="283" 
                   strokeDashoffset="70"
                   strokeLinecap="round"
                   className="drop-shadow-sm"
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <ArrowUpRight className="w-6 h-6 text-[#22c55e]" />
               </div>
            </div>
          </div>
          
          {/* Badge */}
          <div className={cn(
            "mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-md transition-all duration-700",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-[#15803d] uppercase tracking-wider">Elite Form</span>
          </div>
        </div>

        {/* Stats Section - Improvement & Percentile */}
        <div className={cn(
          "relative z-10 px-8 py-4 grid grid-cols-2 gap-3 transition-all duration-700 delay-300",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Improvement</p>
            </div>
            <p className="text-3xl font-bold text-foreground">+12%</p>
            <p className="text-xs text-muted-foreground mt-1">vs last attempt</p>
          </div>
          
          <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</p>
            </div>
            <p className="text-3xl font-bold text-foreground">72%</p>
            <p className="text-xs text-muted-foreground mt-1">better than users</p>
          </div>
        </div>

        {/* Bottom Stats - Grand & Clean */}
        <div className={cn(
          "relative z-10 px-8 py-4 grid grid-cols-3 gap-4 transition-all duration-700 delay-500",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wider">
               <Activity className="w-3 h-3" /> Technique
             </div>
             <span className="text-3xl font-bold text-foreground">80%</span>
             <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-[80%]" />
             </div>
          </div>
          
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-amber-600 uppercase tracking-wider">
               <Zap className="w-3 h-3" /> Stability
             </div>
             <span className="text-3xl font-bold text-foreground">75%</span>
             <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
               <div className="h-full bg-amber-500 w-[75%]" />
             </div>
          </div>
          
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 uppercase tracking-wider">
               <Shield className="w-3 h-3" /> Alignment
             </div>
             <span className="text-3xl font-bold text-foreground">85%</span>
             <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-[85%]" />
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={cn(
          "relative z-20 px-8 pb-8 mt-auto flex flex-col gap-3 transition-all duration-700 delay-700",
          showContent ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
           <Button 
             className="w-full h-14 text-lg font-bold bg-[#22c55e] text-white hover:bg-[#16a34a] shadow-lg shadow-green-500/20"
             onClick={() => setLocation("/video-analysis")}
           >
             View Full Analysis <ChevronRight className="w-5 h-5 ml-1" />
           </Button>
           <Button 
             variant="outline" 
             className="w-full h-14 text-base font-medium border-black/10 bg-white/50 text-foreground hover:bg-white/80"
             onClick={() => setLocation("/video-analysis")}
           >
             <PlayCircle className="w-5 h-5 mr-2" /> Video Breakdown
           </Button>
        </div>

      </div>
    </Layout>
  );
}
