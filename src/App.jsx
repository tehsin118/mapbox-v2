import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import DetailPanel from "./components/DetailPanel";
import MasterplanModal from "./components/MasterplanModal";
import ClassifyModal from "./components/ClassifyModal";

import "./index.css";

// Load any previously saved custom districts from localStorage
function loadCustomDistricts() {
  try {
    const saved = localStorage.getItem("customDistricts");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCustomDistricts(districts) {
  try {
    localStorage.setItem("customDistricts", JSON.stringify(districts));
  } catch {
    /* silently fail */
  }
}

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [masterplanType, setMasterplanType] = useState(null);
  // "standard" | "dark" | "light" | "satellite" | "terrain"
  const [mapStyle, setMapStyle] = useState("standard");

  // Derive UI theme from mapStyle — standard/light → light UI, rest → dark UI
  const theme =
    mapStyle === "light" || mapStyle === "standard" ? "light" : "dark";

  const handleMapStyleChange = useCallback((style) => {
    setMapStyle(style);
  }, []);

  // ── Draw mode state ────────────────────────────────────
  const [isDrawing, setIsDrawing] = useState(false);
  const [pendingFeature, setPendingFeature] = useState(null); // feature awaiting classification
  const [customDistricts, setCustomDistricts] = useState(loadCustomDistricts);

  const handleDistrictClick = useCallback((districtProps) => {
    setSelectedDistrict(districtProps);
    setSelectedBuilding(null);
  }, []);

  const handleBuildingClick = useCallback((buildingProps) => {
    setSelectedBuilding(buildingProps);
    setSelectedDistrict(null);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedDistrict(null);
    setSelectedBuilding(null);
  }, []);

  const handleViewMasterplan = useCallback(
    (type) => {
      const planType = type || selectedDistrict?.masterplan || "residential";
      setMasterplanType(planType);
    },
    [selectedDistrict],
  );

  const handleCloseMasterplan = useCallback(() => {
    setMasterplanType(null);
  }, []);

  // ── Draw handlers ──────────────────────────────────────
  const handleToggleDraw = useCallback(() => {
    setIsDrawing((prev) => !prev);
  }, []);

  const handleDrawCreate = useCallback((feature) => {
    // User finished drawing a polygon → open classify modal
    setIsDrawing(false);
    setPendingFeature(feature);
  }, []);

  const handleClassifyConfirm = useCallback(
    (classifiedFeature) => {
      const updated = [...customDistricts, classifiedFeature];
      setCustomDistricts(updated);
      saveCustomDistricts(updated);
      setPendingFeature(null);
    },
    [customDistricts],
  );

  const handleClassifyCancel = useCallback(() => {
    setPendingFeature(null);
  }, []);

  const handleDeleteCustomDistrict = useCallback(
    (id) => {
      const updated = customDistricts.filter((f) => f.properties.id !== id);
      setCustomDistricts(updated);
      saveCustomDistricts(updated);
      if (selectedDistrict?.id === id) {
        setSelectedDistrict(null);
      }
    },
    [customDistricts, selectedDistrict],
  );

  const isDark = theme === "dark";

  return (
    <div
      className={`h-screen w-screen flex overflow-hidden ${isDark ? "bg-[#0A0B0E]" : "bg-gray-100"}`}
    >
      {/* Sidebar */}
      <Sidebar
        onDistrictSelect={handleDistrictClick}
        onBuildingSelect={handleBuildingClick}
        selectedDistrictId={selectedDistrict?.id}
        selectedBuildingId={selectedBuilding?.id}
        onViewMasterplan={() => handleViewMasterplan()}
        isDrawing={isDrawing}
        onToggleDraw={handleToggleDraw}
        customDistricts={customDistricts}
        onDeleteCustomDistrict={handleDeleteCustomDistrict}
        theme={theme}
      />

      {/* Map + Detail Panel Area */}
      <div className="flex-1 relative">
        <MapView
          onDistrictClick={handleDistrictClick}
          onBuildingClick={handleBuildingClick}
          selectedDistrictId={selectedDistrict?.id}
          selectedBuildingId={selectedBuilding?.id}
          isDrawing={isDrawing}
          onDrawCreate={handleDrawCreate}
          customDistricts={customDistricts}
          theme={theme}
          mapStyle={mapStyle}
          onMapStyleChange={handleMapStyleChange}
        />

        {/* Draw mode indicator */}
        <AnimatePresence>
          {isDrawing && (
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-10
              px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg
              border border-blue-400/30 shadow-lg"
            >
              <p className="text-[12px] text-white font-medium">
                Click on the map to draw a polygon — double-click to finish
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Right-side Detail Panel */}
        <AnimatePresence>
          {(selectedDistrict || selectedBuilding) && (
            <DetailPanel
              key={selectedDistrict?.id || selectedBuilding?.id}
              district={selectedDistrict}
              building={selectedBuilding}
              onClose={handleClosePanel}
              onViewMasterplan={handleViewMasterplan}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Masterplan Modal */}
      <AnimatePresence>
        {masterplanType && (
          <MasterplanModal
            initialPlan={masterplanType}
            onClose={handleCloseMasterplan}
          />
        )}
      </AnimatePresence>

      {/* Classify Modal — shown after user draws a polygon */}
      <AnimatePresence>
        {pendingFeature && (
          <ClassifyModal
            feature={pendingFeature}
            onConfirm={handleClassifyConfirm}
            onCancel={handleClassifyCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
