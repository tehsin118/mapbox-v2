import { useEffect, useRef } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

// Custom draw styles that match the dark theme
const DRAW_STYLES = [
  // Polygon fill while drawing
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
      "fill-color": "#3B82F6",
      "fill-outline-color": "#3B82F6",
      "fill-opacity": 0.15,
    },
  },
  // Polygon outline while drawing
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#60A5FA",
      "line-dasharray": [2, 2],
      "line-width": 2,
    },
  },
  // Vertex points
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#fff",
      "circle-stroke-color": "#3B82F6",
      "circle-stroke-width": 2,
    },
  },
  // Midpoint vertices
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "meta", "midpoint"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#60A5FA",
    },
  },
  // Line while drawing
  {
    id: "gl-draw-line",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#60A5FA",
      "line-dasharray": [2, 2],
      "line-width": 2,
    },
  },
  // Points
  {
    id: "gl-draw-point-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 6,
      "circle-color": "#3B82F6",
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 2,
    },
  },
];

export default function DrawControl({
  mapRef,
  isDrawing,
  onDrawCreate,
  onDrawModeChange,
}) {
  const drawRef = useRef(null);

  useEffect(() => {
    const map = mapRef?.current?.getMap?.();
    if (!map) return;

    // Initialize draw control
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      styles: DRAW_STYLES,
      defaultMode: "simple_select",
    });

    drawRef.current = draw;
    map.addControl(draw, "top-right");

    // Listen for polygon creation
    const handleCreate = (e) => {
      const features = e.features;
      if (features && features.length > 0) {
        const feature = features[0];
        if (feature.geometry.type === "Polygon") {
          onDrawCreate(feature);
          // Remove the drawn feature from draw control (we'll manage it in our own source)
          setTimeout(() => {
            draw.deleteAll();
          }, 100);
        }
      }
    };

    map.on("draw.create", handleCreate);
    map.on("draw.modechange", (e) => {
      onDrawModeChange?.(e.mode);
    });

    return () => {
      map.off("draw.create", handleCreate);
      if (map.hasControl(draw)) {
        map.removeControl(draw);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef?.current]);

  // Toggle draw mode from outside
  useEffect(() => {
    const draw = drawRef.current;
    if (!draw) return;

    if (isDrawing) {
      draw.changeMode("draw_polygon");
    } else {
      draw.changeMode("simple_select");
      draw.deleteAll();
    }
  }, [isDrawing]);

  return null; // This is an imperative control, no UI
}
