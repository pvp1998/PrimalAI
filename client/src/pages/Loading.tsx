import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Brain, Activity, ScanLine, CheckCircle2 } from "lucide-react";

const loadingMessages = [
  "Analyzing body mechanics...",
  "Calculating joint angles...",
  "Evaluating form consistency...",
  "Generating insights...",
  "Finalizing score..."
];

export default function Loading() {
  const [, setLocation] = useLocation();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800); // Faster updates for energy

    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(() => setLocation("/results"), 500);
          return 100;
        }
        return prev + 1; // smooth increment
      });
    }, 40); // ~4 seconds total

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [setLocation]);

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background relative overflow-hidden">
        
        {/* Background Elements - Subtle Pulse */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-64 h-64 bg-primary/5 rounded-full animate-ping duration-[3s]" />
           <div className="absolute w-96 h-96 bg-primary/5 rounded-full animate-ping duration-[3s] delay-700" />
        </div>

        <div className="z-10 flex flex-col items-center w-full max-w-xs">
          {/* Central Animation */}
          <div className="relative w-32 h-32 mb-12">
            {/* Spinning outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-muted border-t-primary animate-spin duration-1000" />
            
            {/* Inner pulsating core */}
            <div className="absolute inset-4 bg-background rounded-full shadow-lg flex items-center justify-center border border-border">
               <Brain className="w-10 h-10 text-primary animate-pulse" />
            </div>
            
            {/* Scanning effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full opacity-30">
               <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-primary/20 animate-[scan_2s_linear_infinite]" />
            </div>
          </div>

          {/* Status Text */}
          <div className="h-16 flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-xl font-heading font-bold text-foreground transition-all duration-300">
              {loadingMessages[messageIndex]}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">AI Analysis in progress</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Processing</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Floating Icons/Particles (Visual Flair) */}
          <div className="absolute top-1/4 left-8 opacity-20 animate-bounce delay-100">
            <Activity className="w-6 h-6 text-foreground" />
          </div>
          <div className="absolute bottom-1/3 right-8 opacity-20 animate-bounce delay-300">
            <ScanLine className="w-6 h-6 text-foreground" />
          </div>
          <div className="absolute top-1/3 right-12 opacity-20 animate-bounce delay-700">
            <CheckCircle2 className="w-4 h-4 text-foreground" />
          </div>

        </div>
      </div>
    </Layout>
  );
}
