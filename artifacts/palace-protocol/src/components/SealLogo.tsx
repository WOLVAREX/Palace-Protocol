import React from "react";

interface SealLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: "brass" | "brass-light";
  showText?: boolean;
}

export function SealLogo({
  size = 48,
  color = "brass",
  showText = false,
  className = "",
  ...props
}: SealLogoProps) {
  const hexColor = color === "brass-light" ? "#C9A860" : "#A67C3D";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`seal ${className}`}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke={hexColor}
        strokeWidth={showText ? "1" : "1.5"}
      />
      {showText ? (
        <>
          <circle cx="50" cy="50" r="41" fill="none" stroke={hexColor} strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={hexColor} strokeWidth="0.5" />
        </>
      ) : (
        <circle cx="50" cy="50" r="38" fill="none" stroke={hexColor} strokeWidth="1" />
      )}
      
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize={showText ? "26" : "30"}
        fontWeight="600"
        fill={hexColor}
      >
        PP
      </text>

      {showText && (
        <>
          <text
            x="50"
            y="14"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="4"
            letterSpacing="2"
            fill={hexColor}
          >
            PALACE PROTOCOL
          </text>
          <text
            x="50"
            y="90"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="4"
            letterSpacing="2"
            fill={hexColor}
          >
            ACADEMY
          </text>
        </>
      )}
    </svg>
  );
}
