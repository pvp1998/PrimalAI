import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Share2, X, Activity, Zap, Shield, ArrowUpRight, ChevronRight, PlayCircle } from "lucide-react";
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
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden bg-black text-white">
        
        {/* Top Navigation (Overlay) */}
        <div className="relative z-20 p-6 flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/60 uppercase mb-1">Calisthenics AI</p>
            <h1 className="text-2xl font-heading font-bold">Handstand</h1>
          </div>
          <div className="flex gap-3">
            <Button size="icon" variant="ghost" className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
              onClick={() => setLocation("/")}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Score Display - Floating & Massive */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8">
          <div className="flex items-baseline">
            <span className="text-[12rem] leading-none font-heading font-bold tracking-tighter text-white drop-shadow-2xl">
              {score}
            </span>
            <span className="text-4xl font-light text-white/40 ml-2">/100</span>
          </div>
          
          {/* Badge */}
          <div className={cn(
            "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 backdrop-blur-md self-start transition-all duration-700",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Elite Form</span>
          </div>

          {/* Improvement Graph Circle (Mockup from screenshot) */}
          <div className={cn(
            "absolute right-4 bottom-1/3 w-32 h-32 transition-all duration-1000 delay-300",
            showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}>
             <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
               <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
               <circle 
                 cx="50" cy="50" r="45" 
                 stroke="hsl(var(--primary))" 
                 strokeWidth="4" 
                 fill="none" 
                 strokeDasharray="283" 
                 strokeDashoffset="70"
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_10px_hsl(var(--primary))]"
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
               <ArrowUpRight className="w-8 h-8 text-primary" />
             </div>
          </div>
        </div>

        {/* Bottom Stats - Grand & Clean */}
        <div className={cn(
          "relative z-20 px-8 pt-0 pb-8 grid grid-cols-3 gap-4 transition-all duration-700 delay-500",
          showContent ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-blue-400 uppercase tracking-wider">
               <Activity className="w-3 h-3" /> Technique
             </div>
             <span className="text-4xl font-bold text-white">80%</span>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-[80%]" />
             </div>
          </div>
          
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-yellow-400 uppercase tracking-wider">
               <Zap className="w-3 h-3" /> Stability
             </div>
             <span className="text-4xl font-bold text-white">75%</span>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-500 w-[75%]" />
             </div>
          </div>
          
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 uppercase tracking-wider">
               <Shield className="w-3 h-3" /> Alignment
             </div>
             <span className="text-4xl font-bold text-white">85%</span>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-[85%]" />
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={cn(
          "relative z-20 px-8 pb-8 flex flex-col gap-3 transition-all duration-700 delay-700",
          showContent ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
           <Button 
             className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-primary/90"
             onClick={() => setLocation("/video-analysis")}
           >
             View Full Analysis <ChevronRight className="w-5 h-5 ml-1" />
           </Button>
           <Button 
             variant="outline" 
             className="w-full h-14 text-base font-medium border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
             onClick={() => setLocation("/video-analysis")}
           >
             <PlayCircle className="w-5 h-5 mr-2" /> Video Breakdown
           </Button>
        </div>

      </div>
    </Layout>
  );
}
