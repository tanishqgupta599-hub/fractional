"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TrendingUp, PieChart, FileText, AlertCircle, Info } from "lucide-react";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Overview</h1>
          <p className="text-gray-400">Welcome back, Investor</p>
        </div>
        <Button>
          Add Funds
        </Button>
      </div>

      {loading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-[300px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={item}>
              <Card className="p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="group/tooltip relative">
                     <Info className="h-4 w-4 text-gray-400 cursor-help" />
                     <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black/90 border border-white/10 rounded text-xs text-gray-300 invisible group-hover/tooltip:visible z-50">
                        Total market value of your active investments including appreciation.
                     </div>
                   </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">Total Invested Value</p>
                <h2 className="text-3xl font-bold text-white">₹ 45,00,000</h2>
                <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+98% Overall Appreciation</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors" />
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-6 relative group overflow-hidden">
                <p className="text-sm text-gray-500 mb-1">Total Fractions Owned</p>
                <h2 className="text-3xl font-bold text-white">150</h2>
                <div className="flex items-center gap-2 mt-2 text-blue-400 text-sm">
                  <PieChart className="h-4 w-4" />
                  <span>Across 4 Properties</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="group/tooltip relative">
                     <Info className="h-4 w-4 text-gray-400 cursor-help" />
                     <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black/90 border border-white/10 rounded text-xs text-gray-300 invisible group-hover/tooltip:visible z-50">
                        Estimated annual returns based on current rental yields and property appreciation.
                     </div>
                   </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">Projected Annual Yield</p>
                <h2 className="text-3xl font-bold text-white">₹ 12,50,000</h2>
                <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Based on current valuation</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors" />
              </Card>
            </motion.div>
          </div>

          {/* Chart Section */}
          <motion.div variants={item}>
            <PortfolioChart />
          </motion.div>

          {/* Investments Table */}
          <motion.div variants={item}>
            <h2 className="text-xl font-bold text-white mb-6">Your Holdings</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400 uppercase tracking-wider font-medium">
                  <tr>
                    <th className="p-4">Property</th>
                    <th className="p-4">Invested Date</th>
                    <th className="p-4">Units</th>
                    <th className="p-4">Invested Amt</th>
                    <th className="p-4">Current Return</th>
                    <th className="p-4">Documents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">Dholera SIR - Phase 1</div>
                      <div className="text-xs text-gray-500">Commercial Land</div>
                    </td>
                    <td className="p-4">12 Oct 2023</td>
                    <td className="p-4">50</td>
                    <td className="p-4">₹ 2,50,000</td>
                    <td className="p-4 text-green-400 font-bold">100%</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="h-8 hover:text-white hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">Hebatpur HAC</div>
                      <div className="text-xs text-gray-500">Premium Plotting</div>
                    </td>
                    <td className="p-4">05 Jan 2024</td>
                    <td className="p-4">25</td>
                    <td className="p-4">₹ 6,25,000</td>
                    <td className="p-4 text-green-400 font-bold">106%</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="h-8 hover:text-white hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">Panchi Greens</div>
                      <div className="text-xs text-gray-500">Agricultural Land</div>
                    </td>
                    <td className="p-4">15 Feb 2024</td>
                    <td className="p-4">40</td>
                    <td className="p-4">₹ 1,00,000</td>
                    <td className="p-4 text-green-400 font-bold">93%</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="h-8 hover:text-white hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                   <tr className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">Zhanki Reserves</div>
                      <div className="text-xs text-gray-500">Future Development</div>
                    </td>
                    <td className="p-4">20 Mar 2024</td>
                    <td className="p-4">35</td>
                    <td className="p-4">₹ 2,62,500</td>
                    <td className="p-4 text-green-400 font-bold">85%</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="h-8 hover:text-white hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div variants={item} className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> The resale marketplace is currently in beta. Secondary sales are currently processed offline. 
              Please contact support to initiate a sale.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
