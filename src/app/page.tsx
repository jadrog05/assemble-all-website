import Image from "next/image";
import { CheckCircle2, Clock3, Star, Wrench, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-20">
        <section className="flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-4">
            <Image
              src="/assemble-all-fnq-logo.png"
              alt="Assemble All FNQ logo"
              width={70}
              height={70}
              priority
              className="rounded-full border border-blue-400/50"
            />
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Assemble All FNQ
            </h1>
          </div>
          <p className="mb-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
            Professional Assembly Services
          </p>
          <p className="max-w-xl text-lg text-white/75 md:text-xl">
            Professional assembly services across Far North Queensland. Fast,
            reliable, and clean work every time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Badge
              variant="outline"
              className="border-blue-400/40 bg-blue-500/10 px-3 py-1 text-white/90"
            >
              <MapPin className="mr-2 size-4" />
              Local to FNQ
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-400/40 bg-blue-500/10 px-3 py-1 text-white/90"
            >
              <Clock3 className="mr-2 size-4" />
              Same day service
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-400/40 bg-blue-500/10 px-3 py-1 text-white/90"
            >
              <Star className="mr-2 size-4" />
              5-star rated
            </Badge>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#0a0d17] p-6">
            <h2 className="text-3xl font-semibold">Our Recent Work</h2>
            <p className="mt-2 text-white/70">
              Instagram carousel coming soon. This area will showcase recent
              jobs and project photos.
            </p>
          </div>

          <Card className="border-white/10 bg-[#0a0d17] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="size-5 text-blue-300" />
                Current Services
              </CardTitle>
              <CardDescription className="text-white/70">
                Available now across Cairns and nearby areas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-white/85">
              <p>• Flatpack furniture assembly</p>
              <p>• TV units, wardrobes, desks, and bed frames</p>
              <p>• Outdoor furniture and BBQ setup</p>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-14 md:px-10">
        <Separator className="bg-white/10" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-[#0a0d17] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="size-4 text-blue-300" />
                Reliable Timing
              </CardTitle>
              <CardDescription className="text-white/70">
                Turn up on time and get it done right.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-white/10 bg-[#0a0d17] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="size-4 text-blue-300" />
                Clean Finish
              </CardTitle>
              <CardDescription className="text-white/70">
                Built properly, level, and tidy at handover.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-white/10 bg-[#0a0d17] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="size-4 text-blue-300" />
                Friendly Service
              </CardTitle>
              <CardDescription className="text-white/70">
                Professional communication from start to finish.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
