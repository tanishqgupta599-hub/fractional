import { Button } from "@/components/ui/Button";
import { RefreshCcw, ArrowUpRight, Hourglass } from "lucide-react";
import Link from "next/link";

export default function ExitPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Exit & Liquidity</h1>
        <p className="text-xl text-gray-400">
          Real estate is traditionally illiquid. We are changing that with multiple exit avenues.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
            <RefreshCcw className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">1. Resale Platform</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            List your fractions for sale on our secondary marketplace. Other investors can buy your stake instantly.
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Status: Coming Soon</p>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <ArrowUpRight className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">2. Asset Sale</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Once the asset matures or reaches target appreciation, the SPV sells the property and distributes proceeds to all shareholders.
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Timeline: 3-5 Years</p>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <Hourglass className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">3. Private Sale</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            You can transfer your shares to any third party privately. We facilitate the documentation and transfer process.
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Status: Active</p>
        </div>
      </div>

      <div className="mt-20 p-8 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Important Disclosure</h3>
        <p className="text-gray-400 text-sm">
          While we strive to provide liquidity, real estate investments should be considered long-term. 
          There are no guaranteed buybacks or fixed returns. Market conditions may affect the resale value and time to exit.
        </p>
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/properties">
          <Button>View Properties</Button>
        </Link>
      </div>
    </div>
  );
}
