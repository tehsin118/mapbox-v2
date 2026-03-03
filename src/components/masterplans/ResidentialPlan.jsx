// Residential Masterplan SVG — Skyline Residence Tower
// Shows: drop-off points, visitor parking, landscaping, tower footprints

export default function ResidentialPlan() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background / Site Boundary */}
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

      {/* Access Roads */}
      <rect x="40" y="540" width="720" height="30" fill="#E5E7EB" rx="2" />
      <text
        x="400"
        y="560"
        textAnchor="middle"
        className="text-[10px]"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="10"
      >
        MAIN ACCESS ROAD
      </text>
      <rect x="40" y="30" width="30" height="540" fill="#E5E7EB" rx="2" />
      <text
        x="55"
        y="300"
        textAnchor="middle"
        className="text-[10px]"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        transform="rotate(-90, 55, 300)"
      >
        SERVICE ROAD
      </text>

      {/* Landscaped Areas */}
      {/* North Garden */}
      <rect
        x="100"
        y="60"
        width="280"
        height="80"
        rx="6"
        fill="#D1FAE5"
        stroke="#6EE7B7"
        strokeWidth="1"
      />
      <text
        x="240"
        y="95"
        textAnchor="middle"
        fill="#059669"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        NORTH GARDEN
      </text>
      <text
        x="240"
        y="110"
        textAnchor="middle"
        fill="#059669"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Landscaped Green Area
      </text>
      {/* Tree indicators */}
      {[130, 170, 210, 250, 290, 330].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="75"
          r="8"
          fill="#A7F3D0"
          stroke="#6EE7B7"
          strokeWidth="0.5"
        />
      ))}

      {/* South Garden / Play Area */}
      <rect
        x="100"
        y="430"
        width="280"
        height="80"
        rx="6"
        fill="#D1FAE5"
        stroke="#6EE7B7"
        strokeWidth="1"
      />
      <text
        x="240"
        y="465"
        textAnchor="middle"
        fill="#059669"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        SOUTH GARDEN
      </text>
      <text
        x="240"
        y="480"
        textAnchor="middle"
        fill="#059669"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Children's Play Area
      </text>
      {[130, 170, 210, 250, 290, 330].map((cx) => (
        <circle
          key={`s-${cx}`}
          cx={cx}
          cy="495"
          r="8"
          fill="#A7F3D0"
          stroke="#6EE7B7"
          strokeWidth="0.5"
        />
      ))}

      {/* Tower A */}
      <rect
        x="120"
        y="170"
        width="120"
        height="120"
        rx="4"
        fill="#3B82F6"
        opacity="0.85"
      />
      <rect
        x="120"
        y="170"
        width="120"
        height="120"
        rx="4"
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.5"
      />
      <text
        x="180"
        y="225"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        TOWER A
      </text>
      <text
        x="180"
        y="242"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.8"
      >
        35 Floors · 124 Units
      </text>

      {/* Tower B */}
      <rect
        x="260"
        y="170"
        width="120"
        height="120"
        rx="4"
        fill="#3B82F6"
        opacity="0.85"
      />
      <rect
        x="260"
        y="170"
        width="120"
        height="120"
        rx="4"
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.5"
      />
      <text
        x="320"
        y="225"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        TOWER B
      </text>
      <text
        x="320"
        y="242"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.8"
      >
        35 Floors · 124 Units
      </text>

      {/* Lobby & Drop-off */}
      <rect
        x="155"
        y="310"
        width="190"
        height="50"
        rx="4"
        fill="#1D4ED8"
        opacity="0.8"
      />
      <text
        x="250"
        y="335"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        MAIN LOBBY & DROP-OFF
      </text>
      <text
        x="250"
        y="349"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.7"
      >
        Rain Canopy Cover
      </text>

      {/* Drop-off Loop */}
      <path
        d="M 155 390 Q 155 370 175 370 L 325 370 Q 345 370 345 390 L 345 410 Q 345 420 335 420 L 165 420 Q 155 420 155 410 Z"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeDasharray="6 3"
      />
      <text
        x="250"
        y="405"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        DROP-OFF LOOP
      </text>

      {/* Visitor Parking */}
      <rect
        x="440"
        y="60"
        width="290"
        height="200"
        rx="6"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="585"
        y="90"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        VISITOR PARKING
      </text>
      <text
        x="585"
        y="106"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="9"
      >
        48 Surface Bays
      </text>
      {/* Parking rows */}
      {[130, 160, 190, 220].map((y) => (
        <g key={y}>
          <rect x="465" y={y} width="240" height="14" rx="1" fill="#E5E7EB" />
          {[0, 30, 60, 90, 120, 150, 180, 210].map((dx) => (
            <line
              key={dx}
              x1={465 + dx + 15}
              y1={y}
              x2={465 + dx + 15}
              y2={y + 14}
              stroke="#D1D5DB"
              strokeWidth="0.5"
            />
          ))}
        </g>
      ))}

      {/* Basement Entry Ramps */}
      <rect
        x="440"
        y="300"
        width="130"
        height="60"
        rx="4"
        fill="#E5E7EB"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="505"
        y="325"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        BASEMENT RAMP
      </text>
      <text
        x="505"
        y="340"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        East Entry
      </text>

      <rect
        x="600"
        y="300"
        width="130"
        height="60"
        rx="4"
        fill="#E5E7EB"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="665"
        y="325"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        BASEMENT RAMP
      </text>
      <text
        x="665"
        y="340"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        West Entry
      </text>

      {/* Water Feature / Courtyard */}
      <rect
        x="440"
        y="400"
        width="290"
        height="110"
        rx="6"
        fill="#DBEAFE"
        stroke="#93C5FD"
        strokeWidth="1"
      />
      <text
        x="585"
        y="445"
        textAnchor="middle"
        fill="#2563EB"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        LANDSCAPED COURTYARD
      </text>
      <text
        x="585"
        y="462"
        textAnchor="middle"
        fill="#3B82F6"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.8"
      >
        Water Feature & Seating
      </text>
      <ellipse
        cx="585"
        cy="485"
        rx="30"
        ry="12"
        fill="#BFDBFE"
        stroke="#93C5FD"
        strokeWidth="0.5"
      />

      {/* Pedestrian Paths */}
      <line
        x1="380"
        y1="230"
        x2="440"
        y2="160"
        stroke="#F59E0B"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1="380"
        y1="230"
        x2="440"
        y2="460"
        stroke="#F59E0B"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Emergency Access Indicators */}
      {[
        { x: 90, y: 280, label: "E" },
        { x: 390, y: 180, label: "E" },
        { x: 250, y: 528, label: "E" },
      ].map(({ x, y, label }, i) => (
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
            {label}
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
