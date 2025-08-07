interface CorporateRHIconProps {
  className?: string
  size?: number
}

export const CorporateRHIcon = ({
  className = '',
  size = 32,
}: CorporateRHIconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield Background */}
      <path
        className="text-primary/30"
        d="M16 2L6 6v7c0 6.2 4.2 12 10 13.4 5.8-1.4 10-7.2 10-13.4V6L16 2z"
        fill="url(#corporateGradient)"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* HR Symbol */}
      <g fill="white">
        {/* H */}
        <rect height="8" width="2" x="10" y="10" />
        <rect height="2" width="6" x="10" y="13" />
        <rect height="8" width="2" x="14" y="10" />

        {/* R */}
        <rect height="8" width="2" x="18" y="10" />
        <path
          d="M18 10h4c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-4"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <line stroke="white" strokeWidth="2" x1="20" x2="24" y1="15" y2="18" />
      </g>

      {/* People Dots */}
      <g fill="white" opacity="0.7">
        <circle cx="8" cy="24" r="1" />
        <circle cx="12" cy="24" r="1" />
        <circle cx="16" cy="24" r="1" />
        <circle cx="20" cy="24" r="1" />
        <circle cx="24" cy="24" r="1" />
      </g>

      <defs>
        <linearGradient
          id="corporateGradient"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  )
}
