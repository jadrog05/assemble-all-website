import type { Metadata } from "next";

import { QuoteRequestForm } from "@/components/quote-request-form";

export const metadata: Metadata = {
  title: "Request a quote | Assemble All FNQ",
  description:
    "Request a quote for flatpack and furniture assembly in Cairns and Far North Queensland.",
};

export const dynamic = "force-dynamic";

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="mx-auto w-full max-w-xl px-6 py-12 md:px-10 md:py-16">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Request a quote
        </h1>
        <p className="mb-8 text-white/70">
          Share your details and optional photos of your boxes. We will reply
          using your email or mobile.
        </p>
        <QuoteRequestForm />
      </div>
    </main>
  );
}
