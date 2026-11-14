"use client";

import { ArrowUpRight, Landmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function AppHeader({ onReset }: { onReset: () => void }) {
  return <header className="border-b border-line bg-white">
    <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-9">
      <a href="#main" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-primary" aria-label="Prebranch home">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white"><Landmark size={23} strokeWidth={1.6} /></span>
        <span className="text-[23px] font-bold tracking-[-1px] text-ink">prebranch<span className="text-primary">.</span></span>
        <span className="ml-2 hidden border-l border-line pl-4 text-[11px] leading-4 text-muted sm:block">A little guidance.<br />Before you go.</span>
      </a>
      <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-5">
        <Dialog>
          <DialogTrigger asChild><Button variant="ghost" size="sm" className="hidden sm:inline-flex">How it works <ArrowUpRight size={13} /></Button></DialogTrigger>
          <DialogContent>
            <p className="eyebrow mb-3">Made for learning</p>
            <DialogTitle className="text-2xl font-semibold tracking-tight">A preview of a better next step.</DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-6 text-muted">This TD-inspired university project uses scripted examples to show how a pre-branch assistant could work. It is not affiliated with TD.</DialogDescription>
            <ol className="my-6 space-y-4 text-sm leading-6 text-ink">
              <li><strong>1. Choose a task.</strong> Explore a sample banking scenario.</li>
              <li><strong>2. Find a channel.</strong> See online, ATM, phone, or branch guidance.</li>
              <li><strong>3. Plan a visit.</strong> Try a simulated appointment and checklist.</li>
            </ol>
            <div className="rounded-xl bg-surface p-4 text-xs leading-5 text-muted">All guidance, branches, and appointment times are mock data. No banking service is connected. Chat and booking details disappear when you refresh. Do not enter personal or account information.</div>
          </DialogContent>
        </Dialog>
        <Button onClick={onReset} variant="outline" size="sm"><Plus size={15} /><span>New conversation</span></Button>
      </nav>
    </div>
  </header>;
}
