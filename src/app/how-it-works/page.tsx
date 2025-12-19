import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search, CheckCircle2, TrendingUp, Landmark, Banknote } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Select Property",
      desc: "Browse our curated list of high-potential land and commercial assets. Each property is vetted for legal clarity and growth potential.",
    },
    {
      icon: Banknote,
      title: "2. Buy Fraction",
      desc: "Invest as little as ₹5,000. You get digital units representing your ownership share in the property.",
    },
    {
      icon: Landmark,
      title: "3. Ownership via SPV",
      desc: "Your investment is secured through a Special Purpose Vehicle (SPV) or Trust structure, ensuring legal ownership and transparency.",
    },
    {
      icon: TrendingUp,
      title: "4. Hold & Grow",
      desc: "Sit back as your asset appreciates. We handle all maintenance, security, and legal compliances.",
    },
    {
      icon: CheckCircle2,
      title: "5. Exit & Returns",
      desc: "Exit via our resale platform, periodic buybacks, or when the asset is developed/sold for a profit.",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How Fractional Ownership Works</h1>
        <p className="text-xl text-gray-400">
          A simple, transparent, and secure way to build your real estate portfolio.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 -translate-x-1/2" />

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}>
              <div className="flex-1 w-full">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-center`}>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 max-w-sm">{step.desc}</p>
                </div>
              </div>
              
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black border-2 border-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex-1 w-full hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <Link href="/properties">
          <Button size="lg" className="px-12">Start Investing Now</Button>
        </Link>
      </div>
    </div>
  );
}
