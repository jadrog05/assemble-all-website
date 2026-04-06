"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <div className="border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-3 px-6 md:gap-6 md:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/assemble-all-fnq-logo.png"
            alt="Assemble All FNQ logo"
            width={44}
            height={44}
            className="shrink-0 rounded-full border border-blue-400/50"
          />
          <p className="truncate text-lg font-semibold tracking-tight text-white md:text-xl">
            Assemble All FNQ
          </p>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-white/75 md:flex">
          <Link className="transition hover:text-blue-300" href="/">
            Home
          </Link>
          <a className="transition hover:text-blue-300" href="#">
            Our Work
          </a>
          <a className="transition hover:text-blue-300" href="#">
            Reviews
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/request-quote"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white md:size-default"
            )}
          >
            Request a quote
          </Link>
          <Button
            size="sm"
            className="bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:bg-blue-500 md:h-9"
          >
            <Phone className="mr-2 size-4" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
