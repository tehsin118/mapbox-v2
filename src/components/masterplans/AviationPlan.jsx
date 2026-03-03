// Aviation Masterplan SVG — Gateway Business Center
// Shows: plaza, structured parking, tower, service roads

export default function AviationPlan() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect x="0" y="0" width="800" height="600" fill="#FAFAFA" />
      <rect
        x="40"
        y="30"
        width="720"
        height="540"
        rx="4"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="1.5"
        strokeDasharray="8 4"
      />

      {/* Perimeter Roads */}
      <rect x="40" y="540" width="720" height="30" fill="#E5E7EB" rx="2" />
      <text
        x="400"
        y="560"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="10"
      >
        AVIATION BOULEVARD
      </text>
      <rect x="730" y="30" width="30" height="540" fill="#E5E7EB" rx="2" />
      <text
        x="745"
        y="300"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        transform="rotate(90, 745, 300)"
      >
        SERVICE ROAD
      </text>

      {/* Green Buffer — Left */}
      <rect
        x="40"
        y="30"
        width="40"
        height="510"
        rx="3"
        fill="#D1FAE5"
        stroke="#6EE7B7"
        strokeWidth="0.5"
      />
      {[80, 130, 180, 230, 280, 330, 380, 430, 480].map((y) => (
        <circle
          key={y}
          cx="60"
          cy={y}
          r="10"
          fill="#A7F3D0"
          stroke="#6EE7B7"
          strokeWidth="0.5"
        />
      ))}

      {/* Green Buffer — Top */}
      <rect
        x="80"
        y="30"
        width="650"
        height="35"
        rx="3"
        fill="#D1FAE5"
        stroke="#6EE7B7"
        strokeWidth="0.5"
      />

      {/* Tower Footprint */}
      <rect
        x="120"
        y="90"
        width="180"
        height="200"
        rx="6"
        fill="#8B5CF6"
        opacity="0.85"
      />
      <rect
        x="120"
        y="90"
        width="180"
        height="200"
        rx="6"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <text
        x="210"
        y="175"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="600"
      >
        GATEWAY
      </text>
      <text
        x="210"
        y="195"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="600"
      >
        BUSINESS CENTER
      </text>
      <text
        x="210"
        y="218"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        opacity="0.8"
      >
        15 Floors · 18,000 sqft
      </text>

      {/* Retail Podium */}
      <rect
        x="120"
        y="290"
        width="180"
        height="50"
        rx="4"
        fill="#7C3AED"
        opacity="0.6"
      />
      <text
        x="210"
        y="315"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        RETAIL PODIUM — GF
      </text>
      <text
        x="210"
        y="330"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Ground-Level Shops & F&B
      </text>

      {/* Central Plaza */}
      <rect
        x="340"
        y="90"
        width="200"
        height="250"
        rx="8"
        fill="#EDE9FE"
        stroke="#C4B5FD"
        strokeWidth="1"
      />
      <text
        x="440"
        y="140"
        textAnchor="middle"
        fill="#6D28D9"
        fontFamily="Inter, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        CENTRAL PLAZA
      </text>
      <text
        x="440"
        y="158"
        textAnchor="middle"
        fill="#7C3AED"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        opacity="0.8"
      >
        Public Open Space
      </text>

      {/* Sculptural Element */}
      <circle
        cx="440"
        cy="210"
        r="25"
        fill="#DDD6FE"
        stroke="#C4B5FD"
        strokeWidth="1"
      />
      <text
        x="440"
        y="214"
        textAnchor="middle"
        fill="#7C3AED"
        fontFamily="Inter, sans-serif"
        fontSize="7"
      >
        SCULPTURE
      </text>

      {/* Seating Nodes */}
      {[
        { x: 380, y: 260 },
        { x: 440, y: 280 },
        { x: 500, y: 260 },
      ].map(({ x, y }, i) => (
        <rect
          key={i}
          x={x - 15}
          y={y - 6}
          width="30"
          height="12"
          rx="6"
          fill="#C4B5FD"
          opacity="0.5"
        />
      ))}
      <text
        x="440"
        y="310"
        textAnchor="middle"
        fill="#7C3AED"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Seating & Water Features
      </text>

      {/* Pedestrian Paths through plaza */}
      <line
        x1="340"
        y1="200"
        x2="540"
        y2="200"
        stroke="#F59E0B"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1="440"
        y1="90"
        x2="440"
        y2="340"
        stroke="#F59E0B"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Taxi / Rideshare Drop-off */}
      <rect
        x="120"
        y="360"
        width="420"
        height="45"
        rx="4"
        fill="#FEF3C7"
        stroke="#FCD34D"
        strokeWidth="1"
      />
      <text
        x="330"
        y="380"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        TAXI & RIDE-SHARE DROP-OFF BAY
      </text>
      <text
        x="330"
        y="394"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Covered Passenger Waiting Area
      </text>

      {/* Structured Parking */}
      <rect
        x="580"
        y="90"
        width="140"
        height="315"
        rx="6"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="650"
        y="125"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        STRUCTURED
      </text>
      <text
        x="650"
        y="142"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        PARKING
      </text>
      <text
        x="650"
        y="162"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="9"
      >
        4 Levels · 480 Bays
      </text>

      {/* Parking level indicators */}
      {["L1", "L2", "L3", "L4"].map((level, i) => (
        <g key={level}>
          <rect
            x="600"
            y={190 + i * 50}
            width="100"
            height="35"
            rx="3"
            fill="#E5E7EB"
          />
          <text
            x="650"
            y={212 + i * 50}
            textAnchor="middle"
            fill="#6B7280"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fontWeight="500"
          >
            {level} — 120 bays
          </text>
        </g>
      ))}

      {/* Service Road / Loading */}
      <rect
        x="120"
        y="420"
        width="600"
        height="35"
        rx="3"
        fill="#E5E7EB"
        stroke="#D1D5DB"
        strokeWidth="0.5"
      />
      <text
        x="420"
        y="442"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="9"
      >
        SERVICE & LOADING DOCK ACCESS ROAD
      </text>

      {/* Loading Dock */}
      <rect
        x="120"
        y="460"
        width="150"
        height="65"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="195"
        y="490"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        LOADING DOCK
      </text>
      <text
        x="195"
        y="505"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        3 Bays
      </text>

      {/* Building Services */}
      <rect
        x="290"
        y="460"
        width="130"
        height="65"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="355"
        y="490"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        MEP / SERVICES
      </text>
      <text
        x="355"
        y="505"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        Transformer & Generator
      </text>

      {/* Emergency Vehicle Zones */}
      {[
        { x: 100, y: 190 },
        { x: 550, y: 190 },
        { x: 330, y: 528 },
      ].map(({ x, y }, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="8"
            fill="#FEE2E2"
            stroke="#F87171"
            strokeWidth="0.8"
          />
          <text
            x={x}
            y={y + 3.5}
            textAnchor="middle"
            fill="#DC2626"
            fontFamily="Inter, sans-serif"
            fontSize="8"
            fontWeight="600"
          >
            E
          </text>
        </g>
      ))}

      {/* North Arrow */}
      <g transform="translate(730, 560)">
        <polygon points="0,-18 -6,0 6,0" fill="#9CA3AF" />
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill="#9CA3AF"
          fontFamily="Inter, sans-serif"
          fontSize="9"
          fontWeight="600"
        >
          N
        </text>
      </g>

      {/* Scale Bar */}
      <line
        x1="80"
        y1="570"
        x2="180"
        y2="570"
        stroke="#9CA3AF"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="565"
        x2="80"
        y2="575"
        stroke="#9CA3AF"
        strokeWidth="1"
      />
      <line
        x1="180"
        y1="565"
        x2="180"
        y2="575"
        stroke="#9CA3AF"
        strokeWidth="1"
      />
      <text
        x="130"
        y="582"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        50m
      </text>
    </svg>
  );
}
