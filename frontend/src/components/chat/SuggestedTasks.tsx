import { ArrowUpRight, CreditCard, Landmark, Sprout, Wallet } from "lucide-react";
import { featuredTasks, tasks } from "@/lib/demo/scenarios";

const icons = [Landmark, CreditCard, Sprout, Wallet];

export function SuggestedTasks({ onSelect, disabled, compact = false }: { onSelect: (question: string) => void; disabled: boolean; compact?: boolean }) {
  if (compact) return <div className="flex flex-wrap gap-2" aria-label="Example banking tasks">{tasks.filter((task) => task.id !== "general").map((task) => <button key={task.id} onClick={() => onSelect(task.question)} disabled={disabled} className="suggestion-chip">{task.title}</button>)}</div>;
  return <div>
    <div className="mb-3 flex items-center justify-between"><p className="eyebrow">Start with a question</p><span className="text-[11px] text-muted">Sample scenarios</span></div>
    <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
      {featuredTasks.map((task, index) => {
        const Icon = icons[index];
        return <button key={task.id} onClick={() => onSelect(task.question)} disabled={disabled} className="group rounded-xl border border-line bg-white p-4 text-left transition-all hover:border-primary/40 hover:bg-[#f8fbf7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50">
          <div className="mb-3 flex items-center justify-between"><Icon size={20} strokeWidth={1.6} className="text-primary" /><ArrowUpRight size={15} className="text-[#a0aaa2] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></div>
          <span className="block text-[13px] font-semibold text-ink">{task.title}</span>
          <span className="mt-1 block text-[11px] text-muted">{task.description}</span>
        </button>;
      })}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted"><span>Also explore</span>{tasks.slice(4, 6).map((task) => <button key={task.id} onClick={() => onSelect(task.question)} disabled={disabled} className="rounded text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary disabled:opacity-50">{task.title}</button>)}</div>
  </div>;
}
