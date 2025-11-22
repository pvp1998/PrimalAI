import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, Play, Pause, Scissors, RotateCcw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLocation } from "wouter";

export function AnalysisModal() {
  const [step, setStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [videoSelected, setVideoSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setLocation("/loading"); // Changed from /results to /loading
    }, 500);
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedSkill("");
    setVideoSelected(false);
  };

  return (
    <Drawer onOpenChange={(open) => !open && resetFlow()}>
      <DrawerTrigger asChild>
        <Button 
          size="lg" 
          className="w-full h-14 text-lg font-heading font-bold shadow-xl shadow-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <Camera className="mr-2 w-6 h-6" />
          Analyze Video
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-card border-t border-border max-h-[90vh]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-center font-heading text-xl">New Analysis</DrawerTitle>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? "Select Skill" : step === 2 ? "Upload Video" : "Preview & Trim"}</span>
              </div>
              <Progress value={(step / 3) * 100} className="h-2 bg-muted" />
            </div>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            {step === 1 && (
              <div className="space-y-6 py-4 animate-in slide-in-from-right-8 fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Which skill are you practicing?</label>
                  <Select onValueChange={setSelectedSkill} value={selectedSkill}>
                    <SelectTrigger className="h-12 bg-background border-input text-lg">
                      <SelectValue placeholder="Select a skill..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muscle-up">Muscle Up</SelectItem>
                      <SelectItem value="handstand">Handstand</SelectItem>
                      <SelectItem value="front-lever">Front Lever</SelectItem>
                      <SelectItem value="planche">Planche</SelectItem>
                      <SelectItem value="pistol-squat">Pistol Squat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   {/* Quick select chips */}
                   {["Muscle Up", "Handstand", "Front Lever", "Planche"].map((skill) => (
                     <div 
                       key={skill}
                       onClick={() => setSelectedSkill(skill.toLowerCase().replace(" ", "-"))}
                       className={cn(
                         "p-3 rounded-lg border border-border bg-background/50 cursor-pointer hover:border-primary/50 hover:bg-background transition-all text-center text-sm font-medium",
                         selectedSkill === skill.toLowerCase().replace(" ", "-") && "border-primary bg-primary/10 text-primary"
                       )}
                     >
                       {skill}
                     </div>
                   ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 py-8 flex flex-col items-center justify-center animate-in slide-in-from-right-8 fade-in duration-300">
                {!videoSelected ? (
                  <div 
                    onClick={() => setVideoSelected(true)}
                    className="w-full h-48 border-2 border-dashed border-muted-foreground/30 rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">Select from Gallery</p>
                      <p className="text-sm text-muted-foreground">or record a new video</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative rounded-xl overflow-hidden aspect-video bg-black border border-border">
                     <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                       <span className="text-xs">Video Preview Placeholder</span>
                     </div>
                     <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-mono">00:12</div>
                     <div className="absolute top-2 right-2">
                       <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={() => setVideoSelected(false)}>
                         <RotateCcw className="w-4 h-4" />
                       </Button>
                     </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 py-4 animate-in slide-in-from-right-8 fade-in duration-300">
                 <div className="w-full rounded-xl overflow-hidden aspect-video bg-black border border-border relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                       {!isPlaying && (
                         <Button 
                           size="icon" 
                           className="h-12 w-12 rounded-full opacity-90 hover:opacity-100 hover:scale-105 transition-all"
                           onClick={() => setIsPlaying(true)}
                         >
                           <Play className="w-6 h-6 ml-1" />
                         </Button>
                       )}
                    </div>
                    {isPlaying && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary animate-[progress_12s_linear]" />
                    )}
                 </div>
                 
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium text-muted-foreground">
                     <span>00:02</span>
                     <span>Trim Video</span>
                     <span>00:10</span>
                   </div>
                   <div className="relative h-12 bg-muted/30 rounded border border-border flex items-center px-2">
                     <div className="absolute left-[10%] right-[20%] top-0 bottom-0 bg-primary/20 border-x-2 border-primary cursor-grab active:cursor-grabbing flex items-center justify-center group">
                        <div className="w-8 h-8 bg-background rounded-full shadow border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Scissors className="w-4 h-4 text-primary" />
                        </div>
                     </div>
                   </div>
                 </div>
              </div>
            )}
          </div>

          <DrawerFooter className="pt-2">
            {step < 3 ? (
              <Button 
                onClick={handleNext} 
                disabled={step === 1 ? !selectedSkill : !videoSelected}
                className="w-full h-12 text-lg"
              >
                Next Step
              </Button>
            ) : (
              <div className="flex gap-3">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1 h-12">Discard</Button>
                </DrawerClose>
                <Button onClick={handleAnalyze} className="flex-[2] h-12" disabled={isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : (
                    <>
                      <CheckCircle2 className="mr-2 w-5 h-5" />
                      Analyze Form
                    </>
                  )}
                </Button>
              </div>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
