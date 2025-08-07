interface RHControlIconProps {
  className?: string
  size?: number
}

export const RHControlIcon = ({
  className = '',
  size = 32,
}: RHControlIconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        className="text-primary/20"
        cx="16"
        cy="16"
        fill="url(#gradient1)"
        r="15"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* People Icon */}
      <g transform="translate(6, 8)">
        {/* Person 1 */}
        <circle
          className="text-primary"
          cx="6"
          cy="4"
          fill="currentColor"
          r="2.5"
        />
        <path
          className="text-primary"
          d="M2 14c0-2.2 1.8-4 4-4s4 1.8 4 4v1H2v-1z"
          fill="currentColor"
        />

        {/* Person 2 */}
        <circle
          className="text-primary/70"
          cx="14"
          cy="4"
          fill="currentColor"
          r="2.5"
        />
        <path
          className="text-primary/70"
          d="M10 14c0-2.2 1.8-4 4-4s4 1.8 4 4v1h-8v-1z"
          fill="currentColor"
        />
      </g>

      {/* Control/Management Symbol */}
      <g transform="translate(20, 6)">
        <rect
          className="text-secondary"
          fill="currentColor"
          height="2"
          rx="1"
          width="8"
          x="0"
          y="0"
        />
        <rect
          className="text-secondary/80"
          fill="currentColor"
          height="2"
          rx="1"
          width="6"
          x="0"
          y="4"
        />
        <rect
          className="text-secondary"
          fill="currentColor"
          height="2"
          rx="1"
          width="8"
          x="0"
          y="8"
        />
        <rect
          className="text-secondary/60"
          fill="currentColor"
          height="2"
          rx="1"
          width="4"
          x="0"
          y="12"
        />
      </g>

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient1" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop
            className="text-primary/10"
            offset="0%"
            stopColor="currentColor"
          />
          <stop
            className="text-primary/5"
            offset="100%"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
