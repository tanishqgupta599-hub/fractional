import { Button } from "@/components/ui/Button";
import { ShieldCheck, FileText, Lock, Users } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Safety, Legal & Governance</h1>
        <p className="text-xl text-gray-400">
          We use a bank-grade legal structure to ensure your ownership is secure, transparent, and compliant.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">SPV Structure</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Every property is held in a separate Special Purpose Vehicle (SPV), usually a Private Limited Company or LLP. 
            When you invest, you are allotted shares/units in this SPV proportional to your investment.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">• You become a direct shareholder</li>
            <li className="flex items-center gap-2">• Your name appears in ROC records</li>
            <li className="flex items-center gap-2">• Complete bankruptcy remoteness from our platform</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Escrow Mechanism</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            We never touch your money directly. All funds are routed through a SEBI-regulated Escrow Account 
            managed by a trusteeship partner.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">• Funds released only for property purchase</li>
            <li className="flex items-center gap-2">• Independent trustee oversight</li>
            <li className="flex items-center gap-2">• Transparent audit trail</li>
          </ul>
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/20">
        <h2 className="text-2xl font-bold text-white mb-4">Transparency Promise</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          We believe in absolute transparency. No hidden fees, no fine print. 
          We do not guarantee returns, but we guarantee clarity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> View Sample Share Certificate
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> View Sample SPV Agreement
          </Button>
        </div>
      </div>
    </div>
  );
}
