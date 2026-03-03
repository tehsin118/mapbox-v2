// Building data — GeoJSON FeatureCollection for known buildings
// Each feature has rich metadata displayed in the detail panel

export const BUILDING_CATEGORIES = {
  Residential: { color: "#3B82F6", icon: "Building2" },
  Commercial: { color: "#8B5CF6", icon: "Briefcase" },
  Logistics: { color: "#F97316", icon: "Truck" },
};

export const buildingsGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "BLDG-001",
      properties: {
        id: "BLDG-001",
        name: "Skyline Residence Tower",
        districtId: "district-residential",
        communityId: "community-a1",
        heightMeters: 120,
        category: "Residential",
        status: "Completed",
        gfa: 25000,
        floors: 35,
        developer: "Dubai South Properties",
        thumbnail: "",
        gallery: [],
        isBuilding: true,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.115, 24.932],
            [55.118, 24.932],
            [55.118, 24.935],
            [55.115, 24.935],
            [55.115, 24.932],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "BLDG-002",
      properties: {
        id: "BLDG-002",
        name: "South Logistics Hub Warehouse",
        districtId: "district-logistics",
        communityId: "community-b1",
        heightMeters: 18,
        category: "Logistics",
        status: "Under Construction",
        gfa: 45000,
        floors: 2,
        developer: "DS Logistics",
        thumbnail: "",
        gallery: [],
        isBuilding: true,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.192, 24.872],
            [55.198, 24.872],
            [55.198, 24.877],
            [55.192, 24.877],
            [55.192, 24.872],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "BLDG-003",
      properties: {
        id: "BLDG-003",
        name: "Gateway Business Center",
        districtId: "district-aviation",
        communityId: "community-c2",
        heightMeters: 65,
        category: "Commercial",
        status: "Completed",
        gfa: 18000,
        floors: 15,
        developer: "Aviation District Corp",
        thumbnail: "",
        gallery: [],
        isBuilding: true,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [55.155, 24.862],
            [55.16, 24.862],
            [55.16, 24.866],
            [55.155, 24.866],
            [55.155, 24.862],
          ],
        ],
      },
    },
  ],
};
