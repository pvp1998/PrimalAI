import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { HistoryItem } from "@/components/HistoryItem";
import { AnalysisModal } from "@/components/AnalysisModal";
import { Settings, Activity, Trophy, Flame, Video } from "lucide-react";
import logo from "@assets/generated_images/modern_minimal_geometric_monkey_head_logo_in_amber_orange.png";
import bgTexture from "@assets/generated_images/cinematic_dark_abstract_gym_atmosphere_with_smoke_and_lighting.png";
import { useAnalysis } from "@/lib/AnalysisContext";

export default function Home() {
  const { history } = useAnalysis();

  return (
    <Layout>
      {/* Background Texture */}
      <div className="fixed inset-0 z-0">
        <img src={bgTexture} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="p-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-primary/10 p-1.5 border border-primary/20 backdrop-blur-md">
               <img src={logo} alt="Primal AI Logo" className="w-full h-full object-contain" />
             </div>
             <div>
               <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Welcome back</p>
               <h1 className="text-xl font-heading font-bold text-foreground">Alex Strength</h1>
             </div>
          </div>
          <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-white/10">
            <Settings className="w-6 h-6" />
          </button>
        </header>

        {/* Quick Stats Grid */}
        <section className="p-6 pt-4 grid grid-cols-2 gap-3">
          <StatsCard 
            label="Analyzed" 
            value={history.length} 
            icon={<Video className="w-3 h-3 text-blue-400" />}
            className="glass-dark border-l-4 border-l-blue-500"
          />
          <StatsCard 
            label="Skills" 
            value="5" 
            icon={<Activity className="w-3 h-3 text-emerald-400" />}
            className="glass-dark border-l-4 border-l-emerald-500"
          />
          <StatsCard 
            label="Streak" 
            value="12 Days" 
            icon={<Flame className="w-3 h-3 text-orange-500" />}
            className="glass-dark border-l-4 border-l-orange-500"
          />
          <StatsCard 
            label="Best Score" 
            value="94" 
            icon={<Trophy className="w-3 h-3 text-yellow-400" />}
            className="glass-dark border-l-4 border-l-yellow-500"
          />
        </section>

        {/* Recent History */}
        <section className="flex-1 px-6 pb-24 overflow-y-auto">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-heading font-bold text-foreground">Recent Activity</h2>
            <button className="text-xs font-medium text-primary hover:underline">View All</button>
          </div>
          
          <div className="space-y-3">
            {history.map((item) => (
              <HistoryItem 
                key={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                date={item.date}
                score={item.score}
              />
            ))}
          </div>
        </section>

        {/* Bottom Action Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-0 bg-gradient-to-t from-background via-background to-transparent">
          <AnalysisModal />
        </div>
      </div>
    </Layout>
  );
}
