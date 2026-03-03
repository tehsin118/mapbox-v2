import {
  X,
  MapPin,
  Ruler,
  Users,
  Activity,
  Tag,
  FileText,
  ChevronRight,
  Building2,
  ArrowUpDown,
  Layers,
  Briefcase,
  Truck,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { DISTRICT_TYPES } from "../data/districts";
import { BUILDING_CATEGORIES } from "../data/buildings";

export default function DetailPanel({
  district,
  building,
  onClose,
  onViewMasterplan,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  // Determine what to show
  const item = building || district;
  if (!item) return null;

  const isBuilding = !!building;

  return (
    <motion.div
      initial={{ x: 380 }}
      animate={{ x: 0 }}
      exit={{ x: 380 }}
      transition={{ type: "spring", damping: 30, stiffness: 320 }}
      className={`absolute right-0 top-0 h-full w-[380px] backdrop-blur-xl
        border-l z-20 flex flex-col transition-colors duration-200 shadow-2xl
        ${
          isDark
            ? "bg-gradient-to-b from-[#111318]/98 to-[#0A0B0E]/98 border-white/[0.08]"
            : "bg-gradient-to-b from-white/98 to-gray-50/98 border-gray-200"
        }`}
    >
      {isBuilding ? (
        <BuildingDetail building={building} isDark={isDark} onClose={onClose} />
      ) : (
        <DistrictDetail
          district={district}
          isDark={isDark}
          onClose={onClose}
          onViewMasterplan={onViewMasterplan}
        />
      )}
    </motion.div>
  );
}

/* ── Building Detail View ──────────────────────── */
function BuildingDetail({ building, isDark, onClose }) {
  const cat = BUILDING_CATEGORIES[building.category] || {
    color: "#6B7280",
    icon: "Building2",
  };

  const CategoryIcon =
    building.category === "Logistics"
      ? Truck
      : building.category === "Commercial"
        ? Briefcase
        : Building2;

  return (
    <>
      {/* Header */}
      <div
        className={`px-8 pt-8 pb-6 border-b ${isDark ? "border-white/[0.08]" : "border-gray-200"}`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                isDark
                  ? "bg-gradient-to-br shadow-black/20"
                  : "bg-gradient-to-br shadow-gray-200"
              }`}
              style={{
                background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                border: `1px solid ${cat.color}30`,
              }}
            >
              <CategoryIcon size={20} style={{ color: cat.color }} />
            </div>
            <div>
              <h2
                className={`text-[19px] font-bold tracking-[-0.02em] mb-2
                ${isDark ? "text-white/95" : "text-gray-900"}`}
              >
                {building.name}
              </h2>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-1.5"
                style={{ color: cat.color }}
              >
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                {building.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all duration-200
              ${isDark ? "hover:bg-white/[0.08] active:bg-white/[0.12]" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <X
              size={16}
              className={
                isDark
                  ? "text-white/50 hover:text-white/70"
                  : "text-gray-400 hover:text-gray-600"
              }
            />
          </button>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border
            ${
              building.status === "Completed"
                ? isDark
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isDark
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <Activity size={11} strokeWidth={2.5} />
            {building.status}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className={`flex-1 overflow-y-auto ${isDark ? "custom-scrollbar" : "custom-scrollbar-light"}`}
      >
        {/* Stats Grid */}
        <div
          className={`px-8 py-7 border-b ${isDark ? "border-white/[0.05]" : "border-gray-100"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className={`w-1 h-4 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-[0.1em]
              ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              Building Details
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatItem
              icon={ArrowUpDown}
              label="Height"
              value={`${building.heightMeters} m`}
              isDark={isDark}
            />
            <StatItem
              icon={Layers}
              label="Floors"
              value={building.floors}
              isDark={isDark}
            />
            <StatItem
              icon={BarChart3}
              label="GFA"
              value={`${(building.gfa || 0).toLocaleString()} sqft`}
              isDark={isDark}
            />
            <StatItem
              icon={Tag}
              label="Category"
              value={building.category}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Developer Info */}
        <div
          className={`px-8 py-7 border-b ${isDark ? "border-white/[0.05]" : "border-gray-100"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className={`w-1 h-4 rounded-full ${isDark ? "bg-violet-500" : "bg-violet-600"}`}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-[0.1em]
              ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              Developer
            </span>
          </div>
          <div
            className={`flex items-center gap-4 px-5 py-4 rounded-lg border ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-violet-500/10" : "bg-violet-100"
              }`}
            >
              <Briefcase
                size={16}
                className={isDark ? "text-violet-400" : "text-violet-600"}
              />
            </div>
            <span
              className={`text-[14px] font-semibold ${isDark ? "text-white/80" : "text-gray-800"}`}
            >
              {building.developer || "N/A"}
            </span>
          </div>
        </div>

        {/* IDs */}
        <div className={`px-8 py-7`}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className={`w-1 h-4 rounded-full ${isDark ? "bg-orange-500" : "bg-orange-600"}`}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-[0.1em]
              ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              Reference IDs
            </span>
          </div>
          <div
            className={`space-y-3 px-5 py-4 rounded-lg border ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between py-1">
              <span
                className={`text-[11px] font-medium uppercase tracking-wide ${isDark ? "text-white/40" : "text-gray-500"}`}
              >
                Building ID
              </span>
              <span
                className={`text-[12px] font-mono font-semibold ${isDark ? "text-white/70" : "text-gray-700"}`}
              >
                {building.id}
              </span>
            </div>
            {building.districtId && (
              <div
                className={`flex items-center justify-between py-1 border-t ${isDark ? "border-white/[0.04]" : "border-gray-200"}`}
              >
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide ${isDark ? "text-white/40" : "text-gray-500"}`}
                >
                  District
                </span>
                <span
                  className={`text-[12px] font-mono font-semibold ${isDark ? "text-white/70" : "text-gray-700"}`}
                >
                  {building.districtId}
                </span>
              </div>
            )}
            {building.communityId && (
              <div
                className={`flex items-center justify-between py-1 border-t ${isDark ? "border-white/[0.04]" : "border-gray-200"}`}
              >
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide ${isDark ? "text-white/40" : "text-gray-500"}`}
                >
                  Community
                </span>
                <span
                  className={`text-[12px] font-mono font-semibold ${isDark ? "text-white/70" : "text-gray-700"}`}
                >
                  {building.communityId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── District Detail View (original) ──────────── */
function DistrictDetail({ district, isDark, onClose, onViewMasterplan }) {
  const config =
    DISTRICT_TYPES[district.districtType] || DISTRICT_TYPES.residential;

  return (
    <>
      {/* Header */}
      <div
        className={`px-8 pt-8 pb-6 border-b ${isDark ? "border-white/[0.08]" : "border-gray-200"}`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                isDark ? "shadow-black/20" : "shadow-gray-200"
              }`}
              style={{
                background: `linear-gradient(135deg, ${config.color}20, ${config.color}10)`,
                border: `1px solid ${config.color}30`,
              }}
            >
              <MapPin size={20} style={{ color: config.color }} />
            </div>
            <div>
              <h2
                className={`text-[19px] font-bold tracking-[-0.02em] mb-2
                ${isDark ? "text-white/95" : "text-gray-900"}`}
              >
                {district.label}
              </h2>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-1.5"
                style={{ color: config.color }}
              >
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {config.label} District
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all duration-200
              ${isDark ? "hover:bg-white/[0.08] active:bg-white/[0.12]" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <X
              size={16}
              className={
                isDark
                  ? "text-white/50 hover:text-white/70"
                  : "text-gray-400 hover:text-gray-600"
              }
            />
          </button>
        </div>
        <p
          className={`text-[13px] leading-[1.7] ${isDark ? "text-white/55" : "text-gray-600"}`}
        >
          {district.description}
        </p>
      </div>

      {/* Scrollable Content */}
      <div
        className={`flex-1 overflow-y-auto ${isDark ? "custom-scrollbar" : "custom-scrollbar-light"}`}
      >
        {/* Stats Grid */}
        <div
          className={`px-8 py-7 border-b ${isDark ? "border-white/[0.05]" : "border-gray-100"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className={`w-1 h-4 rounded-full`}
              style={{ backgroundColor: config.color }}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-[0.1em]
              ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              Overview
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatItem
              icon={Ruler}
              label="Area"
              value={district.area}
              isDark={isDark}
            />
            <StatItem
              icon={Users}
              label="Population"
              value={district.population}
              isDark={isDark}
            />
            <StatItem
              icon={Activity}
              label="Status"
              value={district.status}
              isDark={isDark}
            />
            <StatItem
              icon={Tag}
              label="Zoning"
              value={district.zoning}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Key Features */}
        <div
          className={`px-8 py-7 border-b ${isDark ? "border-white/[0.05]" : "border-gray-100"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className={`w-1 h-4 rounded-full`}
              style={{ backgroundColor: config.color }}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-[0.1em]
              ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              Key Features
            </span>
          </div>
          <ul className="space-y-3">
            {(district.keyFeatures || []).map((feature, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg ${
                  isDark ? "bg-white/[0.02]" : "bg-gray-50"
                }`}
              >
                <div
                  className={`p-1 rounded-md mt-0.5 ${
                    isDark ? "bg-white/[0.05]" : "bg-white"
                  }`}
                >
                  <MapPin
                    size={11}
                    className={isDark ? "text-white/40" : "text-gray-400"}
                  />
                </div>
                <span
                  className={`text-[13px] leading-[1.6] ${isDark ? "text-white/65" : "text-gray-700"}`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Masterplan Link */}
        <div className="px-8 py-7">
          <button
            onClick={() => onViewMasterplan(district.masterplan)}
            className={`w-full flex items-center gap-4 px-5 py-4 border rounded-xl
              transition-all duration-200 group shadow-sm hover:shadow-md
              ${
                isDark
                  ? "bg-gradient-to-r from-white/[0.06] to-white/[0.04] hover:from-white/[0.09] hover:to-white/[0.06] border-white/[0.1]"
                  : "bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 border-gray-200"
              }`}
          >
            <div
              className={`p-2.5 rounded-lg ${
                isDark ? "bg-blue-500/15" : "bg-blue-50"
              }`}
            >
              <FileText
                size={18}
                className={isDark ? "text-blue-400" : "text-blue-600"}
              />
            </div>
            <div className="flex-1 text-left">
              <span
                className={`text-[14px] font-semibold block mb-0.5
                ${isDark ? "text-white/80" : "text-gray-800"}`}
              >
                View Site Masterplan
              </span>
              <span
                className={`text-[11px] ${isDark ? "text-white/40" : "text-gray-500"}`}
              >
                2D architectural layout & zoning
              </span>
            </div>
            <ChevronRight
              size={16}
              className={`transition-transform group-hover:translate-x-0.5
                ${
                  isDark
                    ? "text-white/30 group-hover:text-white/50"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

function StatItem({ icon: Icon, label, value, isDark = true }) {
  return (
    <div
      className={`px-4 py-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]
      ${
        isDark
          ? "bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-white/[0.06] hover:border-white/[0.1]"
          : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-gray-300 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className={`p-1 rounded-md ${
            isDark ? "bg-white/[0.08]" : "bg-gray-100"
          }`}
        >
          <Icon
            size={12}
            className={isDark ? "text-white/40" : "text-gray-500"}
          />
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.08em]
          ${isDark ? "text-white/40" : "text-gray-500"}`}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-[15px] font-bold leading-none
        ${isDark ? "text-white/85" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
