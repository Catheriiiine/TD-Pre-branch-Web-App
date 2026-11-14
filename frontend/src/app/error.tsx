"use client";

import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="mx-auto max-w-lg px-6 py-24"><h1 className="text-2xl font-semibold">The demo could not load.</h1><p className="my-5 text-sm leading-6 text-muted">Please try again. This prototype does not connect to a bank or make real appointments.</p><Button onClick={reset}>Try again</Button></main>;
}
