import { Check, Globe2, Landmark, Phone, Wallet } from "lucide-react";
import { channels } from "@/lib/demo/scenarios";
import type { Guidance } from "@/types/demo";

export const channelIcons = { online: Globe2, atm: Wallet, phone: Phone, branch: Landmark };

export function GuidanceCard({ guidance }: { guidance: Guidance }) {
  const { task, kind } = guidance;
  const Icon = channelIcons[task.channel];
  return <div className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
    <div className="flex items-center gap-3 border-b border-line bg-[#f5f8f2] px-4 py-3">
      <span className="rounded-lg bg-white p-2 text-primary"><Icon size={17} /></span>
      <div><p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-muted">Sample recommended channel</p><p className="mt-0.5 text-sm font-semibold text-primary">{channels[task.channel].label}</p></div>
    </div>
    <div className="p-4">
      <h3 className="mb-3 text-xs font-semibold text-ink">{kind === "documents" ? "Your sample preparation checklist" : "Your next steps"}</h3>
      <ol className="space-y-3">{(kind === "documents" ? task.checklist : task.steps).map((step, index) => <li key={step} className="flex gap-3 text-xs leading-[1.7] text-muted"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-primary">{kind === "documents" ? <Check size={12} /> : index + 1}</span><span>{step}</span></li>)}</ol>
      <details className="mt-4 border-t border-line pt-3 text-[10px] text-muted"><summary className="cursor-pointer rounded py-1 focus-visible:outline-2 focus-visible:outline-primary">Mock source · {task.source}</summary><p className="mt-2 leading-5">A scripted frontend fixture for this university project. Not retrieved from TD or verified as banking policy.</p></details>
    </div>
  </div>;
}
