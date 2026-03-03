import { useState } from "react";
import {
  Moon,
  Sun,
  Satellite,
  Mountain,
  Box,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAP_STYLES = [
  { id: "standard", label: "Standard", icon: Box, description: "3D buildings" },
  { id: "dark", label: "Dark", icon: Moon, description: "Dark basemap" },
  { id: "light", label: "Light", icon: Sun, description: "Light basemap" },
  {
    id: "satellite",
    label: "Satellite",
    icon: Satellite,
    description: "Aerial imagery",
  },
  {
    id: "terrain",
    label: "Terrain",
    icon: Mountain,
    description: "3D elevation",
  },
];

export default function MapStyleSwitcher({ mapStyle, onMapStyleChange }) {
  const [open, setOpen] = useState(false);

  const currentStyle =
    MAP_STYLES.find((s) => s.id === mapStyle) || MAP_STYLES[0];
  const CurrentIcon = currentStyle.icon;

  return (
    <div className="absolute bottom-6 right-4 z-10 flex flex-col items-end gap-2">
      {/* Expanded menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-[#1A1C23]/95 backdrop-blur-lg border border-white/[0.08] rounded-xl
              shadow-2xl overflow-hidden min-w-[180px]"
          >
            <div className="px-3 pt-3 pb-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
                Map Style
              </span>
            </div>
            {MAP_STYLES.map((style) => {
              const Icon = style.icon;
              const isActive = mapStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    onMapStyleChange(style.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors duration-100
                    ${
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-blue-400" : "text-white/40"}
                  />
                  <div className="flex-1 text-left">
                    <span className="text-[13px] font-medium block leading-tight">
                      {style.label}
                    </span>
                    <span className="text-[10px] text-white/30 leading-tight">
                      {style.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
            <div className="h-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3.5 py-2.5
          bg-[#1A1C23]/90 backdrop-blur-lg border border-white/[0.1]
          rounded-xl shadow-lg hover:bg-[#1A1C23] transition-colors duration-150
          group"
        title="Change map style"
      >
        <CurrentIcon
          size={15}
          className="text-white/60 group-hover:text-white/80"
        />
        <span className="text-[12px] font-medium text-white/70 group-hover:text-white/90">
          {currentStyle.label}
        </span>
        {open ? (
          <ChevronDown size={12} className="text-white/30" />
        ) : (
          <ChevronUp size={12} className="text-white/30" />
        )}
      </button>
    </div>
  );
}
