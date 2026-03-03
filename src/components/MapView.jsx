import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import {
  districtsGeoJSON,
  DISTRICT_TYPES,
  DUBAI_SOUTH_CENTER,
} from "../data/districts";
import { buildingsGeoJSON, BUILDING_CATEGORIES } from "../data/buildings";
import DrawControl from "./DrawControl";
import MapStyleSwitcher from "./MapStyleSwitcher";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Mapbox style URLs
const STYLE_URLS = {
  standard: "mapbox://styles/mapbox/standard",
  dark: "mapbox://styles/mapbox/dark-v11",
  light: "mapbox://styles/mapbox/light-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  terrain: "mapbox://styles/mapbox/outdoors-v12",
};

export default function MapView({
  onDistrictClick,
  onBuildingClick,
  selectedDistrictId,
  selectedBuildingId,
  isDrawing,
  onDrawCreate,
  customDistricts = [],
  theme = "dark",
  mapStyle = "dark",
  onMapStyleChange,
}) {
  const isDark = theme === "dark";
  const isStandard = mapStyle === "standard";
  const isSatellite = mapStyle === "satellite";
  const isTerrain = mapStyle === "terrain";
  const mapRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [cursor, setCursor] = useState("grab");
  const [mapLoaded, setMapLoaded] = useState(false);

  // ── Merge static + custom districts into one GeoJSON ───
  const mergedGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: [...districtsGeoJSON.features, ...customDistricts],
    };
  }, [customDistricts]);

  // ── Layer styles ────────────────────────────────────────
  const fillLayer = {
    id: "districts-fill",
    type: "fill",
    paint: {
      "fill-color": [
        "match",
        ["get", "districtType"],
        "residential",
        DISTRICT_TYPES.residential.color,
        "aviation",
        DISTRICT_TYPES.aviation.color,
        "logistics",
        DISTRICT_TYPES.logistics.color,
        "#6B7280",
      ],
      "fill-opacity": [
        "case",
        ["==", ["get", "id"], selectedDistrictId || ""],
        isStandard
          ? 0.3
          : isSatellite || isTerrain
            ? 0.5
            : isDark
              ? 0.45
              : 0.35,
        ["==", ["get", "id"], hoveredId || ""],
        isStandard
          ? 0.25
          : isSatellite || isTerrain
            ? 0.42
            : isDark
              ? 0.38
              : 0.3,
        isStandard
          ? 0.15
          : isSatellite || isTerrain
            ? 0.28
            : isDark
              ? 0.2
              : 0.18,
      ],
    },
  };

  const lineLayer = {
    id: "districts-line",
    type: "line",
    paint: {
      "line-color": [
        "match",
        ["get", "districtType"],
        "residential",
        DISTRICT_TYPES.residential.strokeColor,
        "aviation",
        DISTRICT_TYPES.aviation.strokeColor,
        "logistics",
        DISTRICT_TYPES.logistics.strokeColor,
        "#9CA3AF",
      ],
      "line-width": [
        "case",
        ["==", ["get", "id"], selectedDistrictId || ""],
        isSatellite || isTerrain ? 3 : 2.5,
        ["==", ["get", "id"], hoveredId || ""],
        2,
        isSatellite || isTerrain ? 1.5 : 1,
      ],
      "line-opacity": [
        "case",
        ["==", ["get", "id"], selectedDistrictId || ""],
        1,
        ["==", ["get", "id"], hoveredId || ""],
        0.9,
        isSatellite || isTerrain ? 0.7 : isDark ? 0.5 : 0.6,
      ],
    },
  };

  const labelLayer = {
    id: "districts-label",
    type: "symbol",
    layout: {
      "text-field": ["get", "name"],
      "text-size": 12,
      "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
      "text-anchor": "center",
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": isSatellite
        ? "#FFFFFF"
        : isTerrain || isStandard
          ? "#1F2937"
          : isDark
            ? "#E5E7EB"
            : "#1F2937",
      "text-halo-color": isSatellite
        ? "rgba(0,0,0,0.8)"
        : isTerrain || isStandard
          ? "rgba(255,255,255,0.9)"
          : isDark
            ? "rgba(0,0,0,0.7)"
            : "rgba(255,255,255,0.85)",
      "text-halo-width": isSatellite || isTerrain || isStandard ? 2 : 1.5,
      "text-opacity": [
        "case",
        ["==", ["get", "id"], hoveredId || ""],
        1,
        isSatellite ? 0.9 : isDark ? 0.7 : 0.85,
      ],
    },
  };

  // ── Building layer styles ──────────────────────────────
  const buildingExtrusionLayer = {
    id: "buildings-3d",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": [
        "match",
        ["get", "category"],
        "Residential",
        BUILDING_CATEGORIES.Residential.color,
        "Commercial",
        BUILDING_CATEGORIES.Commercial.color,
        "Logistics",
        BUILDING_CATEGORIES.Logistics.color,
        "#6B7280",
      ],
      "fill-extrusion-height": ["get", "heightMeters"],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": [
        "case",
        ["==", ["get", "id"], selectedBuildingId || ""],
        0.95,
        0.75,
      ],
    },
  };

  // Invisible fill layer on top for click detection
  const buildingClickLayer = {
    id: "buildings-click",
    type: "fill",
    paint: {
      "fill-color": "#000000",
      "fill-opacity": 0,
    },
  };

  // ── Interactions ────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    const features = e.features;
    if (features && features.length > 0) {
      const id = features[0].properties.id;
      setHoveredId(id);
      setCursor("pointer");
    } else {
      setHoveredId(null);
      setCursor("grab");
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoveredId(null);
    setCursor("grab");
  }, []);

  const onClick = useCallback(
    (e) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      // 1. Check if user clicked one of our known buildings
      const buildingFeatures = map.queryRenderedFeatures(e.point, {
        layers: ["buildings-click"],
      });
      if (buildingFeatures && buildingFeatures.length > 0) {
        const props = buildingFeatures[0].properties;
        let parsed = { ...props };
        // Parse stringified arrays
        if (typeof parsed.gallery === "string") {
          try {
            parsed.gallery = JSON.parse(parsed.gallery);
          } catch {
            parsed.gallery = [];
          }
        }
        parsed.isBuilding = true;
        onBuildingClick(parsed);
        return;
      }

      // 2. Check if user clicked a district polygon
      const districtFeatures = e.features;
      if (districtFeatures && districtFeatures.length > 0) {
        const props = districtFeatures[0].properties;
        let parsed = { ...props };
        if (typeof parsed.keyFeatures === "string") {
          try {
            parsed.keyFeatures = JSON.parse(parsed.keyFeatures);
          } catch {
            parsed.keyFeatures = [];
          }
        }
        onDistrictClick(parsed);
        return;
      }

      // 3. Check if user clicked a basemap building (Mapbox Standard 3D)
      const allFeatures = map.queryRenderedFeatures(e.point);
      const basemapBuilding = allFeatures.find(
        (f) =>
          f.sourceLayer === "building" || f.layer?.id?.includes("building"),
      );
      if (basemapBuilding) {
        const p = basemapBuilding.properties || {};
        onBuildingClick({
          id: `basemap-${Math.random().toString(36).slice(2, 9)}`,
          name: p.name || "Unknown Building",
          category: p.type
            ? p.type.charAt(0).toUpperCase() + p.type.slice(1)
            : "Building",
          heightMeters: p.height || p.render_height || "—",
          floors: p.height ? Math.round(p.height / 3.2) : "—",
          gfa: "—",
          status: "—",
          developer: "—",
          isBuilding: true,
          isBasemap: true,
        });
        return;
      }
    },
    [onDistrictClick, onBuildingClick],
  );

  // ── Clean up non-essential labels on style load ────────
  const onLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const style = map.getStyle();
    if (!style || !style.layers) return;

    // Hide POI labels, road labels, and other clutter (except for terrain/satellite/standard)
    if (
      mapStyle !== "terrain" &&
      mapStyle !== "satellite" &&
      mapStyle !== "standard"
    ) {
      style.layers.forEach((layer) => {
        if (
          layer.type === "symbol" &&
          (layer.id.includes("poi") ||
            layer.id.includes("transit") ||
            layer.id.includes("airport") ||
            layer.id.includes("natural-point") ||
            layer.id.includes("waterway-label"))
        ) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      });
    }

    setMapLoaded(true);
  }, [mapStyle]);

  // ── Add / remove 3D terrain & sky when mapStyle changes ─
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapLoaded) return;

    if (isTerrain) {
      // Add DEM source for elevation
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Add sky layer for realistic horizon
      if (!map.getLayer("sky")) {
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 0.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });
      }

      // Tilt the camera for a 3D perspective
      map.easeTo({ pitch: 60, duration: 800 });
    } else {
      // Remove terrain
      if (map.getTerrain()) {
        map.setTerrain(null);
      }
      // Remove sky layer
      if (map.getLayer("sky")) {
        map.removeLayer("sky");
      }

      // Flatten the view
      map.easeTo({ pitch: 0, duration: 600 });
    }

    if (isStandard) {
      // Standard style has built-in 3D buildings — tilt the camera
      map.easeTo({ pitch: 45, bearing: -15, duration: 800 });
    } else if (isSatellite) {
      // Add slight pitch for satellite to feel immersive
      map.easeTo({ pitch: 30, duration: 600 });
    }
  }, [mapStyle, mapLoaded, isTerrain, isSatellite, isStandard]);

  // Fly to selected district (search both static + custom)
  useEffect(() => {
    if (!selectedDistrictId || !mapRef.current) return;
    const feature = mergedGeoJSON.features.find(
      (f) => f.properties.id === selectedDistrictId,
    );
    if (!feature) return;

    const coords = feature.geometry.coordinates[0];
    const bounds = coords.reduce(
      (b, c) => b.extend(c),
      new mapboxgl.LngLatBounds(coords[0], coords[0]),
    );
    mapRef.current.fitBounds(bounds, { padding: 120, duration: 800 });
  }, [selectedDistrictId, mergedGeoJSON]);

  // Fly to selected building
  useEffect(() => {
    if (!selectedBuildingId || !mapRef.current) return;
    const feature = buildingsGeoJSON.features.find(
      (f) => f.properties.id === selectedBuildingId,
    );
    if (!feature) return;

    const coords = feature.geometry.coordinates[0];
    const bounds = coords.reduce(
      (b, c) => b.extend(c),
      new mapboxgl.LngLatBounds(coords[0], coords[0]),
    );
    mapRef.current.fitBounds(bounds, {
      padding: 200,
      duration: 800,
      maxZoom: 17,
      pitch: 60,
      bearing: -30,
    });
  }, [selectedBuildingId]);

  return (
    <div className="relative w-full h-full">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: DUBAI_SOUTH_CENTER.longitude,
          latitude: DUBAI_SOUTH_CENTER.latitude,
          zoom: DUBAI_SOUTH_CENTER.zoom,
          pitch: 0,
          bearing: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={STYLE_URLS[mapStyle] || STYLE_URLS.dark}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["districts-fill", "buildings-click"]}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onLoad={onLoad}
        cursor={isDrawing ? "crosshair" : cursor}
        maxZoom={25}
        minZoom={9}
        terrain={
          isTerrain ? { source: "mapbox-dem", exaggeration: 1.5 } : undefined
        }
      >
        <Source id="districts" type="geojson" data={mergedGeoJSON}>
          <Layer {...fillLayer} />
          <Layer {...lineLayer} />
          <Layer {...labelLayer} />
        </Source>

        {/* Known buildings — 3D extrusions + invisible click target */}
        <Source id="buildings" type="geojson" data={buildingsGeoJSON}>
          <Layer {...buildingExtrusionLayer} />
          <Layer {...buildingClickLayer} />
        </Source>

        {/* Draw control — only active once map is loaded */}
        {mapLoaded && (
          <DrawControl
            mapRef={mapRef}
            isDrawing={isDrawing}
            onDrawCreate={onDrawCreate}
            onDrawModeChange={() => {}}
          />
        )}
      </Map>

      {/* Floating map style switcher */}
      <MapStyleSwitcher
        mapStyle={mapStyle}
        onMapStyleChange={onMapStyleChange}
      />
    </div>
  );
}
