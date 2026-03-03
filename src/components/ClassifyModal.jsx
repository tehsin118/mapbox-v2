import { useState } from "react";
import { X, MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";
import { DISTRICT_TYPES } from "../data/districts";

export default function ClassifyModal({ feature, onConfirm, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [districtType, setDistrictType] = useState("residential");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = `custom-${Date.now()}`;
    const config = DISTRICT_TYPES[districtType];

    const classifiedFeature = {
      ...feature,
      id,
      properties: {
        id,
        name: name.trim(),
        districtType,
        label: name.trim(),
        description:
          description.trim() || `Custom ${config.label} zone drawn by user.`,
        area: "—",
        population: "—",
        status: "User Defined",
        keyFeatures: ["Custom-drawn boundary"],
        zoning: `${config.label} (Custom)`,
        masterplan: districtType,
        isCustom: true,
      },
    };

    onConfirm(classifiedFeature);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative w-[420px] bg-[#15171C] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <h3 className="text-[15px] font-semibold text-white/90">
              Classify New Zone
            </h3>
            <p className="text-[11px] text-white/35 mt-0.5">
              Name and categorize the area you just drew
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-md hover:bg-white/[0.06] transition-colors"
          >
            <X size={15} className="text-white/40" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-[0.06em] block mb-1.5">
              Zone Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sector G-11, New Aviation Hub..."
              autoFocus
              className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg
                text-[13px] text-white/80 placeholder-white/20
                focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.06]
                transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-[0.06em] block mb-1.5">
              Description <span className="text-white/20">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this zone..."
              rows={2}
              className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg
                text-[13px] text-white/80 placeholder-white/20 resize-none
                focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.06]
                transition-colors"
            />
          </div>

          {/* District Type */}
          <div>
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-[0.06em] block mb-1.5">
              District Type
            </label>
            <div className="flex gap-2">
              {Object.entries(DISTRICT_TYPES).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDistrictType(key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border text-[12px] font-medium transition-colors
                    ${
                      districtType === key
                        ? "border-white/20 bg-white/[0.08] text-white/90"
                        : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:bg-white/[0.05]"
                    }`}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-3 py-2.5 text-[12px] font-medium text-white/50 
                bg-white/[0.04] border border-white/[0.06] rounded-lg
                hover:bg-white/[0.06] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12px] font-medium
                text-white bg-blue-600 rounded-lg
                hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed
                transition-colors"
            >
              <Check size={13} />
              Add Zone
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
