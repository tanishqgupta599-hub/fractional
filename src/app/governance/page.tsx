"use client";

export default function GovernancePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Governance</h1>
        <p className="text-gray-400 text-lg">
          Policies, oversight, and processes that ensure transparency and investor protection.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-2">Compliance</h2>
          <p className="text-gray-400">Robust KYC, AML checks, and adherence to local regulations.</p>
        </div>
        <div className="p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-2">Transparency</h2>
          <p className="text-gray-400">Regular disclosures on asset status, valuations, and decisions.</p>
        </div>
        <div className="p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-2">Risk Management</h2>
          <p className="text-gray-400">Structured frameworks for legal, market, and operational risks.</p>
        </div>
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Board & Oversight</h2>
        <p className="text-gray-400">
          Independent oversight with documented charters covering conflicts of interest, audit, and controls.
        </p>
      </div>
    </div>
  );
}
