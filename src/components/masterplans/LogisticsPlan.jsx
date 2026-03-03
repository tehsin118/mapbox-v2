// Logistics Masterplan SVG — South Logistics Hub Warehouse
// Shows: loading docks, truck movement paths, warehouse, staging areas

export default function LogisticsPlan() {
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

      {/* Perimeter Road — Bottom */}
      <rect x="40" y="540" width="720" height="30" fill="#E5E7EB" rx="2" />
      <text
        x="400"
        y="560"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="10"
      >
        INDUSTRIAL ACCESS ROAD
      </text>

      {/* Perimeter Road — Right */}
      <rect x="730" y="30" width="30" height="510" fill="#E5E7EB" rx="2" />

      {/* Security Gate */}
      <rect
        x="340"
        y="510"
        width="120"
        height="25"
        rx="4"
        fill="#FEE2E2"
        stroke="#F87171"
        strokeWidth="1"
      />
      <text
        x="400"
        y="527"
        textAnchor="middle"
        fill="#DC2626"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        SECURITY GATE
      </text>

      {/* Weigh Bridge */}
      <rect
        x="470"
        y="510"
        width="100"
        height="25"
        rx="4"
        fill="#FEF3C7"
        stroke="#FCD34D"
        strokeWidth="1"
      />
      <text
        x="520"
        y="527"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        WEIGH BRIDGE
      </text>

      {/* Main Warehouse */}
      <rect
        x="120"
        y="160"
        width="480"
        height="200"
        rx="6"
        fill="#F97316"
        opacity="0.8"
      />
      <rect
        x="120"
        y="160"
        width="480"
        height="200"
        rx="6"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
      />
      <text
        x="360"
        y="245"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="600"
      >
        MAIN WAREHOUSE
      </text>
      <text
        x="360"
        y="268"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        opacity="0.85"
      >
        45,000 sqft — Cold Chain & Automated Sorting
      </text>
      <text
        x="360"
        y="285"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        opacity="0.7"
      >
        Clear Height: 12m · Fire Rating: 2hr
      </text>

      {/* North Loading Docks */}
      <g>
        <text
          x="360"
          y="140"
          textAnchor="middle"
          fill="#EA580C"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="600"
        >
          NORTH LOADING DOCKS — 18 BAYS
        </text>
        {Array.from({ length: 18 }, (_, i) => (
          <rect
            key={`n-${i}`}
            x={130 + i * 26}
            y={148}
            width="20"
            height="12"
            rx="1"
            fill="#EA580C"
            opacity="0.7"
          />
        ))}
      </g>

      {/* South Loading Docks */}
      <g>
        {Array.from({ length: 18 }, (_, i) => (
          <rect
            key={`s-${i}`}
            x={130 + i * 26}
            y={360}
            width="20"
            height="12"
            rx="1"
            fill="#EA580C"
            opacity="0.7"
          />
        ))}
        <text
          x="360"
          y="388"
          textAnchor="middle"
          fill="#EA580C"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="600"
        >
          SOUTH LOADING DOCKS — 18 BAYS
        </text>
      </g>

      {/* Truck Circulation Loop */}
      {/* Main loop path */}
      <path
        d="M 400 510 L 400 400 L 90 400 L 90 120 L 400 120 L 620 120 L 620 400 L 400 400"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="8 4"
      />
      {/* Direction arrows on truck path */}
      <polygon points="400,480 394,490 406,490" fill="#F59E0B" />
      <polygon points="90,250 84,260 96,260" fill="#F59E0B" />
      <polygon points="350,120 360,114 360,126" fill="#F59E0B" />
      <polygon points="620,300 614,290 626,290" fill="#F59E0B" />

      <text
        x="100"
        y="270"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        transform="rotate(-90,94,280)"
      >
        TRUCK PATH
      </text>
      <text
        x="570"
        y="275"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        transform="rotate(90,620,280)"
      >
        TRUCK PATH
      </text>

      {/* Truck Staging Area */}
      <rect
        x="640"
        y="60"
        width="80"
        height="300"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="715"
        y="380"
        textAnchor="end"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
        transform="rotate(0,680,200)"
      >
        TRUCK STAGING
      </text>
      {/* Truck bay indicators */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={`t-${i}`}
          x={650}
          y={75 + i * 23}
          width="60"
          height="16"
          rx="2"
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth="0.5"
        />
      ))}

      {/* Admin / Office Block */}
      <rect
        x="120"
        y="45"
        width="160"
        height="70"
        rx="4"
        fill="#3B82F6"
        opacity="0.8"
      />
      <rect
        x="120"
        y="45"
        width="160"
        height="70"
        rx="4"
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.5"
      />
      <text
        x="200"
        y="80"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="600"
      >
        ADMIN / OFFICE
      </text>
      <text
        x="200"
        y="100"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        opacity="0.8"
      >
        Operations & Control Room
      </text>

      {/* Employee Parking */}
      <rect
        x="310"
        y="45"
        width="130"
        height="70"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="375"
        y="80"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        EMPLOYEE PARKING
      </text>
      <text
        x="375"
        y="100"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        80 Bays
      </text>

      {/* Visitor Parking */}
      <rect
        x="470"
        y="45"
        width="130"
        height="70"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="535"
        y="80"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        VISITOR PARKING
      </text>
      <text
        x="535"
        y="100"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        24 Bays
      </text>

      {/* Yard Areas */}
      <rect
        x="120"
        y="420"
        width="200"
        height="110"
        rx="4"
        fill="#FFF7ED"
        stroke="#FDBA74"
        strokeWidth="1"
      />
      <text
        x="220"
        y="445"
        textAnchor="middle"
        fill="#EA580C"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        CONTAINER YARD
      </text>
      <text
        x="220"
        y="462"
        textAnchor="middle"
        fill="#F97316"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        Temporary Storage
      </text>
      {/* Container indicators */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`c-${row}-${col}`}
            x={145 + col * 42}
            y={470 + row * 12}
            width="35"
            height="8"
            rx="1"
            fill="#FDBA74"
            opacity="0.4"
          />
        )),
      )}

      {/* Fuel & Services */}
      <rect
        x="350"
        y="420"
        width="120"
        height="60"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="410"
        y="448"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        FUEL STATION
      </text>
      <text
        x="410"
        y="464"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        Diesel & AdBlue
      </text>

      {/* Truck Wash */}
      <rect
        x="500"
        y="420"
        width="100"
        height="60"
        rx="4"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <text
        x="550"
        y="448"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
      >
        TRUCK WASH
      </text>
      <text
        x="550"
        y="464"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Inter, sans-serif"
        fontSize="8"
      >
        2 Lanes
      </text>

      {/* Barrier indicators at gate */}
      {/* <line
        x1="340"
        y1="518"
        x2="340"
        y2="542"
        stroke="#DC2626"
        strokeWidth="2"
      />
      <line
        x1="460"
        y1="518"
        x2="460"
        y2="542"
        stroke="#DC2626"
        strokeWidth="2"
      /> */}

      {/* ONE WAY labels */}
      <text
        x="115"
        y="395"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="600"
      >
        ONE WAY ↑
      </text>
      <text
        x="590"
        y="130"
        textAnchor="middle"
        fill="#D97706"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="600"
      >
        ONE WAY ↓
      </text>

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
        100m
      </text>
    </svg>
  );
}
