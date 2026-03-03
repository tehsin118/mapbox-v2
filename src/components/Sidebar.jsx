import { useState } from "react";
import {
  Layers,
  Map as MapIcon,
  MapPin,
  Building2,
  FileText,
  ChevronDown,
  ChevronRight,
  PenTool,
  Trash2,
  Square,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { districtsGeoJSON, DISTRICT_TYPES } from "../data/districts";
import { buildingsGeoJSON, BUILDING_CATEGORIES } from "../data/buildings";

export default function Sidebar({
  onDistrictSelect,
  onBuildingSelect,
  selectedDistrictId,
  selectedBuildingId,
  onViewMasterplan,
  isDrawing,
  onToggleDraw,
  customDistricts = [],
  onDeleteCustomDistrict,
  theme = "dark",
}) {
  const [expandedDistricts, setExpandedDistricts] = useState(true);
  const [expandedBuildings, setExpandedBuildings] = useState(true);
  const [expandedCustom, setExpandedCustom] = useState(false);
  const isDark = theme === "dark";

  return (
    <div
      className={`h-full w-72 border-r flex flex-col transition-colors duration-200 
      ${isDark ? "bg-[#111318] border-white/[0.06]" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div
        className={`px-5 pt-6 pb-4 border-b ${isDark ? "border-white/[0.06]" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className={`w-7 h-7 rounded-md flex items-center justify-center
            ${isDark ? "bg-white/[0.06]" : "bg-gray-100"}`}
          >
            <MapIcon
              size={15}
              className={isDark ? "text-white/60" : "text-gray-500"}
            />
          </div>
          <h1
            className={`text-[15px] font-semibold tracking-[-0.01em]
            ${isDark ? "text-white/90" : "text-gray-900"}`}
          >
            Urban Planner
          </h1>
        </div>
        <p
          className={`text-[11px] mt-1.5 leading-relaxed pl-[38px]
          ${isDark ? "text-white/35" : "text-gray-400"}`}
        >
          Dubai South, United Arab Emirates
        </p>
      </div>

      {/* District List */}
      <div
        className={`flex-1 overflow-y-auto py-3 ${isDark ? "custom-scrollbar" : "custom-scrollbar-light"}`}
      >
        <div className="px-4 mb-2">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.08em]
            ${isDark ? "text-white/30" : "text-gray-400"}`}
          >
            Districts
          </span>
        </div>

        {/* Districts */}
        <div className="mb-0.5">
          <button
            onClick={() => setExpandedDistricts(!expandedDistricts)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 transition-colors duration-150
              ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"}`}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: DISTRICT_TYPES.residential?.color || "#3B82F6",
              }}
            />
            <MapPin
              size={14}
              className={isDark ? "text-white/40" : "text-gray-400"}
            />
            <span
              className={`text-[13px] font-medium flex-1 text-left
              ${isDark ? "text-white/70" : "text-gray-700"}`}
            >
              Districts
            </span>
            <span
              className={`text-[11px] mr-1 ${isDark ? "text-white/25" : "text-gray-300"}`}
            >
              {districtsGeoJSON.features.length}
            </span>
            {expandedDistricts ? (
              <ChevronDown
                size={13}
                className={isDark ? "text-white/25" : "text-gray-300"}
              />
            ) : (
              <ChevronRight
                size={13}
                className={isDark ? "text-white/25" : "text-gray-300"}
              />
            )}
          </button>

          <AnimatePresence>
            {expandedDistricts && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {districtsGeoJSON.features.map((feature) => {
                  const isSelected =
                    selectedDistrictId === feature.properties.id;
                  const dConfig =
                    DISTRICT_TYPES[feature.properties.districtType];
                  return (
                    <button
                      key={feature.properties.id}
                      onClick={() => onDistrictSelect(feature.properties)}
                      className={`w-full flex items-center gap-2.5 pl-9 pr-4 py-1.5 transition-colors duration-150
                        ${
                          isSelected
                            ? isDark
                              ? "bg-white/[0.06] text-white/90"
                              : "bg-blue-50 text-gray-900"
                            : isDark
                              ? "text-white/45 hover:bg-white/[0.03] hover:text-white/65"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: dConfig?.color || "#6B7280",
                        }}
                      />
                      <span className="text-[12px] text-left truncate">
                        {feature.properties.name}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* ── Buildings ──────────────────────────────── */}
        <div className="px-4 mt-4 mb-2">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.08em]
            ${isDark ? "text-white/30" : "text-gray-400"}`}
          >
            Buildings
          </span>
        </div>

        <div className="mb-0.5">
          <button
            onClick={() => setExpandedBuildings(!expandedBuildings)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 transition-colors duration-150
              ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"}`}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-violet-500" />
            <Building2
              size={14}
              className={isDark ? "text-white/40" : "text-gray-400"}
            />
            <span
              className={`text-[13px] font-medium flex-1 text-left
              ${isDark ? "text-white/70" : "text-gray-700"}`}
            >
              Known Buildings
            </span>
            <span
              className={`text-[11px] mr-1 ${isDark ? "text-white/25" : "text-gray-300"}`}
            >
              {buildingsGeoJSON.features.length}
            </span>
            {expandedBuildings ? (
              <ChevronDown
                size={13}
                className={isDark ? "text-white/25" : "text-gray-300"}
              />
            ) : (
              <ChevronRight
                size={13}
                className={isDark ? "text-white/25" : "text-gray-300"}
              />
            )}
          </button>

          <AnimatePresence>
            {expandedBuildings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {buildingsGeoJSON.features.map((feature) => {
                  const props = feature.properties;
                  const isSelected = selectedBuildingId === props.id;
                  const cat = BUILDING_CATEGORIES[props.category];
                  return (
                    <button
                      key={props.id}
                      onClick={() =>
                        onBuildingSelect({ ...props, isBuilding: true })
                      }
                      className={`w-full flex items-center gap-2.5 pl-9 pr-4 py-1.5 transition-colors duration-150
                        ${
                          isSelected
                            ? isDark
                              ? "bg-white/[0.06] text-white/90"
                              : "bg-blue-50 text-gray-900"
                            : isDark
                              ? "text-white/45 hover:bg-white/[0.03] hover:text-white/65"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat?.color || "#6B7280" }}
                      />
                      <span className="text-[12px] text-left truncate">
                        {props.name}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* ── Custom / User-Drawn Zones ─────────────────── */}
        {customDistricts.length > 0 && (
          <>
            <div className="px-4 mt-4 mb-2">
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.08em]
                ${isDark ? "text-white/30" : "text-gray-400"}`}
              >
                Custom Zones
              </span>
            </div>

            <div className="mb-0.5">
              <button
                onClick={() => setExpandedCustom(!expandedCustom)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 transition-colors duration-150
                  ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"}`}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
                <Square
                  size={14}
                  className={isDark ? "text-white/40" : "text-gray-400"}
                />
                <span
                  className={`text-[13px] font-medium flex-1 text-left
                  ${isDark ? "text-white/70" : "text-gray-700"}`}
                >
                  User Drawn
                </span>
                <span
                  className={`text-[11px] mr-1 ${isDark ? "text-white/25" : "text-gray-300"}`}
                >
                  {customDistricts.length}
                </span>
                {expandedCustom ? (
                  <ChevronDown
                    size={13}
                    className={isDark ? "text-white/25" : "text-gray-300"}
                  />
                ) : (
                  <ChevronRight
                    size={13}
                    className={isDark ? "text-white/25" : "text-gray-300"}
                  />
                )}
              </button>

              <AnimatePresence>
                {expandedCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {customDistricts.map((feature) => {
                      const props = feature.properties;
                      const isSelected = selectedDistrictId === props.id;
                      const config =
                        DISTRICT_TYPES[props.districtType] ||
                        DISTRICT_TYPES.city;
                      return (
                        <div
                          key={props.id}
                          className={`w-full flex items-center gap-2 pl-9 pr-3 py-1.5 transition-colors duration-150 group
                            ${
                              isSelected
                                ? isDark
                                  ? "bg-white/[0.06] text-white/90"
                                  : "bg-blue-50 text-gray-900"
                                : isDark
                                  ? "text-white/45 hover:bg-white/[0.03] hover:text-white/65"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            }`}
                        >
                          <button
                            onClick={() => onDistrictSelect(props)}
                            className="flex items-center gap-2 flex-1 min-w-0 text-left"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: config?.color || "#10B981",
                              }}
                            />
                            <span className="text-[12px] truncate">
                              {props.name}
                            </span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCustomDistrict(props.id);
                            }}
                            className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-all
                              ${isDark ? "hover:bg-white/[0.08]" : "hover:bg-red-50"}`}
                            title="Delete zone"
                          >
                            <Trash2 size={11} className="text-red-400/70" />
                          </button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div
        className={`px-4 pb-5 pt-3 border-t space-y-2
        ${isDark ? "border-white/[0.06]" : "border-gray-200"}`}
      >
        <button
          onClick={onToggleDraw}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5
            border rounded-lg transition-colors duration-150
            ${
              isDrawing
                ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
                : isDark
                  ? "bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08]"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
            }`}
        >
          <PenTool
            size={14}
            className={
              isDrawing
                ? "text-blue-400"
                : isDark
                  ? "text-white/50"
                  : "text-gray-400"
            }
          />
          <span
            className={`text-[12px] font-medium ${isDrawing ? "text-blue-400" : isDark ? "text-white/65" : "text-gray-600"}`}
          >
            {isDrawing ? "Cancel Drawing" : "Draw New Zone"}
          </span>
        </button>
        <button
          onClick={onViewMasterplan}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5
            border rounded-lg transition-colors duration-150
            ${
              isDark
                ? "bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08]"
                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
            }`}
        >
          <FileText
            size={14}
            className={isDark ? "text-white/50" : "text-gray-400"}
          />
          <span
            className={`text-[12px] font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}
          >
            View Masterplan
          </span>
        </button>
      </div>
    </div>
  );
}
