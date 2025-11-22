import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Share2, RotateCcw, ChevronRight, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Results() {
  const [, setLocation] = useLocation();
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Animate score count up
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 87) {
          clearInterval(interval);
          setShowConfetti(true);
          return 87;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-500">
        <div className="text-center mt-4 mb-8">
          <h1 className="text-2xl font-heading font-bold mb-1">Analysis Complete</h1>
          <p className="text-muted-foreground">Great job on that Muscle Up!</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 relative">
          {/* Score Circle */}
          <div className="w-48 h-48 rounded-full border-8 border-muted relative flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="8"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary stroke-current transition-all duration-1000 ease-out"
                strokeWidth="8"
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
              <span className="text-5xl font-heading font-bold">{score}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Score</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Form Strictness</span>
              <span className="text-primary font-bold">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Explosiveness</span>
              <span className="text-primary font-bold">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-green-500 text-sm mb-1">Perfect Lockout</h4>
              <p className="text-xs text-muted-foreground">You maintained excellent arm extension at the top position.</p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <Button className="w-full h-12 text-lg gap-2" onClick={() => console.log("View analysis")}>
            View Detailed Breakdown <ChevronRight className="w-4 h-4" />
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" className="h-12" onClick={() => setLocation("/")}>
               <RotateCcw className="w-4 h-4 mr-2" /> Home
             </Button>
             <Button variant="secondary" className="h-12">
               <Share2 className="w-4 h-4 mr-2" /> Share
             </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
