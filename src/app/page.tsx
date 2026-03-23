import Image from "next/image";
import { ArrowRight, CheckCircle2, Drill, MapPin, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    title: "Flatpack Furniture Assembly",
    description:
      "Fast, tidy assembly for beds, wardrobes, drawers, desks, and more.",
    icon: Wrench,
  },
  {
    title: "Outdoor & BBQ Setup",
    description: "Assemble outdoor furniture and BBQ units ready for use.",
    icon: Drill,
  },
  {
    title: "Home & Office Fit-Out Support",
    description: "Reliable setup for homes, rentals, and small office spaces.",
    icon: CheckCircle2,
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-10 md:px-10 md:py-14">
        <header className="flex flex-col gap-6 rounded-2xl border border-blue-400/20 bg-black/50 p-6 shadow-[0_0_60px_rgba(37,99,235,0.15)] backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
          <div className="space-y-4">
            <Badge className="bg-blue-600/90 text-white hover:bg-blue-600">
              Cairns & FNQ
            </Badge>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              Professional Flatpack Assembly Services in Far North Queensland
            </h1>
            <p className="max-w-2xl text-base text-blue-100/85 md:text-lg">
              Assemble All FNQ provides reliable flatpack furniture assembly
              with a modern, no-fuss service across Cairns and surrounding
              areas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 text-white hover:bg-blue-500">
                Get a Free Quote
                <ArrowRight className="ml-1 size-4" />
              </Button>
              <Button
                variant="outline"
                className="border-blue-400/40 bg-transparent text-blue-100 hover:bg-blue-500/10 hover:text-white"
              >
                View Services
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[260px] shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 md:mx-0">
            <Image
              src="/assemble-all-fnq-logo.png"
              alt="Assemble All FNQ logo"
              width={520}
              height={520}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
        </header>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold md:text-3xl">What We Do</h2>
            <Badge
              variant="outline"
              className="border-blue-400/40 text-blue-100/90"
            >
              Local. Fast. Professional.
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.title}
                className="border-blue-400/20 bg-slate-900/70 text-white"
              >
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300">
                    <service.icon className="size-5" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="text-blue-100/75">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-blue-500/20" />

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="border-blue-400/20 bg-slate-900/70 text-white">
            <CardHeader>
              <CardTitle>Why Choose Assemble All FNQ</CardTitle>
              <CardDescription className="text-blue-100/75">
                We keep things simple, clean, and on time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-100/90 md:text-base">
              <p>• Experienced with all major flatpack brands.</p>
              <p>• Careful, tidy work with attention to detail.</p>
              <p>• Flexible bookings across Cairns and nearby suburbs.</p>
            </CardContent>
          </Card>

          <Card className="border-blue-400/20 bg-blue-950/60 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-blue-300" />
                Service Area
              </CardTitle>
              <CardDescription className="text-blue-100/75">
                Based in Cairns and servicing surrounding FNQ locations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-blue-100/90 md:text-base">
                Need help outside Cairns? Reach out and we can confirm coverage.
              </p>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-500">
                Contact Assemble All FNQ
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
