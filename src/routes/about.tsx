import { createFileRoute } from "@tanstack/react-router";
import { Sprout, AlertTriangle, Cpu, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Farmassist AI" },
      { name: "description", content: "Empowering farmers with accessible AI-powered crop diagnosis." },
      { property: "og:title", content: "About Farmassist AI" },
      { property: "og:description", content: "Our mission to help farmers reduce crop loss." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sprout className="h-3.5 w-3.5" /> Our mission
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
          Empowering farmers <span className="text-primary">with AI</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Every year, billions of dollars in crops are lost to diseases caught too late. Farmassist AI puts a plant pathologist in every farmer's pocket.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Block Icon={AlertTriangle} title="The problem" tone="earth">
          Smallholder farmers often lack timely access to agronomy experts. By the time a disease is identified, half the harvest may already be lost.
        </Block>
        <Block Icon={Cpu} title="Our solution" tone="primary">
          A computer vision model trained on thousands of crop images detects disease, severity and recommends treatment — directly from a phone photo.
        </Block>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Our story</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Born from a hackathon and grown alongside agricultural communities, Farmassist AI is built by a small team of engineers, agronomists and designers committed to making smart agriculture accessible — not just for big farms, but for every farmer with a phone.
        </p>
      </div>
    </div>
  );
}

function Block({ Icon, title, children, tone }: { Icon: any; title: string; children: React.ReactNode; tone: "primary" | "earth" }) {
  const bg = tone === "primary" ? "bg-primary/12 text-primary" : "bg-earth/15 text-earth";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
