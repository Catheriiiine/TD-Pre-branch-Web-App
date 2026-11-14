import { Info } from "lucide-react";

export function PrototypeNotice() {
  return <div className="border-b border-[#e6e9dc] bg-[#f3f5eb]">
    <div className="mx-auto flex max-w-[1320px] items-start gap-2.5 px-5 py-2.5 text-[11px] leading-[18px] text-[#5c6750] sm:items-center sm:px-9">
      <Info size={14} className="mt-0.5 shrink-0 sm:mt-0" />
      <p><strong className="font-semibold">University prototype</strong><span className="mx-2 text-[#a3ad96]">/</span>Not affiliated with TD. Guidance and bookings are simulated. Do not enter personal or account information.</p>
    </div>
  </div>;
}
