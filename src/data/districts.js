// GeoJSON data for three key Dubai South districts:
// Residential, Aviation, and Logistics

export const DISTRICT_TYPES = {
  residential: {
    label: "Residential",
    color: "#3B82F6",
    fillOpacity: 0.2,
    strokeColor: "#60A5FA",
  },
  aviation: {
    label: "Aviation",
    color: "#8B5CF6",
    fillOpacity: 0.2,
    strokeColor: "#A78BFA",
  },
  logistics: {
    label: "Logistics",
    color: "#F97316",
    fillOpacity: 0.2,
    strokeColor: "#FB923C",
  },
};

export const districtsGeoJSON = {
  type: "FeatureCollection",
  features: [
    // ── Residential District (north-west) ───────────────
    {
      type: "Feature",
      id: "district-residential",
      properties: {
        id: "district-residential",
        name: "Residential District",
        districtType: "residential",
        label: "Residential District",
        description:
          "The Residential District of Dubai South offers affordable smart-living communities with parks, schools, retail, and transit connectivity — designed for over 250,000 residents.",
        area: "28 km²",
        population: "~60,000 (planned: 250,000)",
        status: "Under Development",
        keyFeatures: [
          "The Pulse — retail and lifestyle boulevard",
          "Emaar South — golf-front villas & apartments",
          "South Bay — waterfront townhouses",
          "MAG 5 Boulevard — affordable apartments",
          "Parks, schools, and community centres",
          "Dubai Metro Route 2020 connectivity",
        ],
        zoning: "Residential Mixed Use",
        masterplan: "residential",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.065, 24.935],
            [55.08, 24.94],
            [55.095, 24.942],
            [55.11, 24.943],
            [55.125, 24.942],
            [55.14, 24.938],
            [55.15, 24.93],
            [55.148, 24.918],
            [55.142, 24.908],
            [55.13, 24.9],
            [55.115, 24.895],
            [55.095, 24.893],
            [55.075, 24.895],
            [55.06, 24.903],
            [55.052, 24.913],
            [55.05, 24.924],
            [55.055, 24.932],
            [55.065, 24.935],
          ],
        ],
      },
    },
    // ── Aviation District (central-south) ───────────────
    {
      type: "Feature",
      id: "district-aviation",
      properties: {
        id: "district-aviation",
        name: "Aviation District",
        districtType: "aviation",
        label: "Aviation District",
        description:
          "The Aviation District surrounds Al Maktoum International Airport (DWC) and serves as a global aerospace hub with MRO facilities, business parks, exhibition centres, and free-zone offices.",
        area: "35 km²",
        population: "~15,000 (workforce)",
        status: "Operational",
        keyFeatures: [
          "Al Maktoum International Airport (DWC)",
          "Aerospace & MRO facilities",
          "Business Park — Grade-A office space",
          "Exhibition & convention centre",
          "Free Zone — 100% foreign ownership",
          "Integrated cargo and logistics links",
        ],
        zoning: "Aviation / Commercial Free Zone",
        masterplan: "aviation",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.105, 24.885],
            [55.12, 24.888],
            [55.135, 24.888],
            [55.15, 24.886],
            [55.165, 24.882],
            [55.175, 24.875],
            [55.178, 24.865],
            [55.175, 24.855],
            [55.168, 24.845],
            [55.155, 24.838],
            [55.14, 24.835],
            [55.125, 24.835],
            [55.11, 24.838],
            [55.098, 24.845],
            [55.09, 24.855],
            [55.088, 24.865],
            [55.092, 24.875],
            [55.105, 24.885],
          ],
        ],
      },
    },
    // ── Logistics District (east) ───────────────────────
    {
      type: "Feature",
      id: "district-logistics",
      properties: {
        id: "district-logistics",
        name: "Logistics District",
        districtType: "logistics",
        label: "Logistics District",
        description:
          "The Logistics District is a dedicated free-zone warehousing and distribution hub adjacent to Jebel Ali Port and Al Maktoum Airport, handling air-sea-road multimodal cargo.",
        area: "22 km²",
        population: "~10,000 (workforce)",
        status: "Operational",
        keyFeatures: [
          "EZDubai — e-commerce fulfilment zone",
          "Warehousing & cold-storage facilities",
          "Air-sea-road multimodal connectivity",
          "Adjacent to Jebel Ali Free Zone & Port",
          "Customs bonded & re-export facilities",
          "Last-mile delivery hub for the UAE",
        ],
        zoning: "Logistics Free Zone",
        masterplan: "logistics",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.175, 24.905],
            [55.19, 24.908],
            [55.205, 24.906],
            [55.22, 24.9],
            [55.232, 24.892],
            [55.238, 24.88],
            [55.237, 24.868],
            [55.23, 24.857],
            [55.218, 24.85],
            [55.205, 24.847],
            [55.19, 24.848],
            [55.178, 24.853],
            [55.17, 24.862],
            [55.165, 24.875],
            [55.165, 24.888],
            [55.168, 24.898],
            [55.175, 24.905],
          ],
        ],
      },
    },
  ],
};

// Center coordinates for the map view (Dubai South)
export const DUBAI_SOUTH_CENTER = {
  longitude: 55.15,
  latitude: 24.878,
  zoom: 12,
};
