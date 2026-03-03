import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { masterplanData } from "../data/masterplanData";
import ResidentialPlan from "./masterplans/ResidentialPlan";
import AviationPlan from "./masterplans/AviationPlan";
import LogisticsPlan from "./masterplans/LogisticsPlan";

const planComponents = {
  residential: ResidentialPlan,
  aviation: AviationPlan,
  logistics: LogisticsPlan,
};

const planKeys = ["residential", "aviation", "logistics"];

export default function MasterplanModal({ initialPlan, onClose }) {
  const [activePlan, setActivePlan] = useState(initialPlan || "residential");
  const data = masterplanData[activePlan];
  const PlanSVG = planComponents[activePlan];

  const currentIndex = planKeys.indexOf(activePlan);
  const goNext = () =>
    setActivePlan(planKeys[(currentIndex + 1) % planKeys.length]);
  const goPrev = () =>
    setActivePlan(
      planKeys[(currentIndex - 1 + planKeys.length) % planKeys.length],
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        className="relative w-[92vw] max-w-[1200px] h-[88vh] max-h-[800px] 
          bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Plan Type Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {planKeys.map((key) => {
                const plan = masterplanData[key];
                const isActive = activePlan === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePlan(key)}
                    className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors duration-150
                      ${
                        isActive
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {plan.type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} className="text-gray-400" />
            </button>
            <button
              onClick={goNext}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* SVG Plan */}
          <div className="flex-1 p-6 overflow-auto bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-[800px]">
              <PlanSVG />
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="w-80 px-5 border-l border-gray-200 bg-white overflow-y-auto">
            {/* Title Section */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: data.typeColor }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: data.typeColor }}
                >
                  {data.type}
                </span>
              </div>
              <h2 className="text-[16px] font-semibold text-gray-900 leading-tight">
                {data.title}
              </h2>
              <p className="text-[12px] text-gray-400 mt-1">{data.subtitle}</p>
            </div>

            {/* Stats */}
            <div className="px-5 py-4 border-b border-gray-100">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em] block mb-3">
                Key Metrics
              </span>
              <div className="grid grid-cols-2 gap-2">
                {data.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-3 py-2 bg-gray-50 rounded-md border border-gray-100"
                  >
                    <span className="text-[10px] text-gray-400 block">
                      {stat.label}
                    </span>
                    <span className="text-[13px] font-semibold text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="px-5 py-4 border-b border-gray-100">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em] block mb-3">
                Legend
              </span>
              <div className="space-y-2">
                {data.legend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[12px] text-gray-600">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Info size={11} className="text-gray-400" />
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em]">
                  Site Features
                </span>
              </div>
              <ul className="space-y-2">
                {data.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-300 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12px] text-gray-500 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
