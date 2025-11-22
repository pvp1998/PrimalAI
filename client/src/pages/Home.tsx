import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { HistoryItem } from "@/components/HistoryItem";
import { AnalysisModal } from "@/components/AnalysisModal";
import { Settings, Activity, Trophy, Flame, Video } from "lucide-react";
import logo from "@assets/generated_images/modern_minimal_geometric_monkey_head_logo_in_amber_orange.png";
import thumb1 from "@assets/generated_images/calisthenics_athlete_doing_a_muscle_up_outdoors.png";
import thumb2 from "@assets/generated_images/person_doing_a_handstand_on_yoga_mat.png";
import thumb3 from "@assets/generated_images/athlete_holding_a_front_lever_on_rings.png";

export default function Home() {
  return (
    <Layout>
      {/* Header */}
      <header className="p-6 pb-2 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-primary/10 p-1.5 border border-primary/20">
             <img src={logo} alt="Primal AI Logo" className="w-full h-full object-contain" />
           </div>
           <div>
             <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Welcome back</p>
             <h1 className="text-xl font-heading font-bold">Alex Strength</h1>
           </div>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Quick Stats Grid */}
      <section className="p-6 pt-4 grid grid-cols-2 gap-3">
        <StatsCard 
          label="Analyzed" 
          value="24" 
          icon={<Video className="w-3 h-3 text-blue-400" />}
          className="border-l-4 border-l-blue-500"
        />
        <StatsCard 
          label="Skills" 
          value="5" 
          icon={<Activity className="w-3 h-3 text-emerald-400" />}
          className="border-l-4 border-l-emerald-500"
        />
        <StatsCard 
          label="Streak" 
          value="12 Days" 
          icon={<Flame className="w-3 h-3 text-orange-500" />}
          className="border-l-4 border-l-orange-500"
        />
        <StatsCard 
          label="Best Score" 
          value="94" 
          icon={<Trophy className="w-3 h-3 text-yellow-400" />}
          className="border-l-4 border-l-yellow-500"
        />
      </section>

      {/* Recent History */}
      <section className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-heading font-bold">Recent Activity</h2>
          <button className="text-xs font-medium text-primary hover:underline">View All</button>
        </div>
        
        <div className="space-y-3">
          <HistoryItem 
            thumbnail={thumb1}
            title="Muscle Up Analysis"
            date="Today, 10:23 AM"
            score={82}
          />
          <HistoryItem 
            thumbnail={thumb2}
            title="Handstand Hold"
            date="Yesterday, 4:15 PM"
            score={65}
          />
          <HistoryItem 
            thumbnail={thumb3}
            title="Front Lever Attempt"
            date="Mon, 12 Nov"
            score={45}
          />
          <HistoryItem 
             thumbnail={thumb1}
             title="Muscle Up Progress"
             date="Sun, 11 Nov"
             score={78}
          />
        </div>
      </section>

      {/* Bottom Action Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-0 bg-gradient-to-t from-background via-background to-transparent">
        <AnalysisModal />
      </div>
    </Layout>
  );
}
