import { useState } from "react";
import { theme } from "./theme";

type MapMarkerProps = {
  pointCount: String;
  size: number;
  isCluster: Boolean;
  selected?: Boolean;
  isContext?: Boolean;
};

function MapMarker({
  pointCount,
  size,
  isCluster,
  selected,
  isContext,
}: MapMarkerProps) {
  const [hover, setHover] = useState(false);

  if (isCluster) {
    return (
      <svg
        height={size}
        viewBox="0 0 100 100"
        onMouseEnter={() => {
          isContext ? undefined : setHover(true);
        }}
        onMouseLeave={() => {
          isContext ? undefined : setHover(false);
        }}
        pointerEvents={isContext ? "none" : "all"}
        cursor={isContext ? undefined : "pointer"}
      >
        <circle
          cx="50"
          cy="50"
          r={hover ? (size + 10) / 2 : size / 2}
          fill={selected ? theme.palette.primary.main : "#fff"}
          stroke={theme.palette.primary.main}
          strokeWidth={8}
        ></circle>
        <text
          x="50%"
          y="50%"
          fontSize={28}
          fontWeight="bold"
          textAnchor="middle"
          dy=".3em"
          color="black"
        >
          {pointCount}
        </text>
      </svg>
    );
  }

  return (
    <svg
      height={size}
      viewBox="0 0 100 100"
      onMouseEnter={() => {
        isContext ? undefined : setHover(true);
      }}
      onMouseLeave={() => {
        isContext ? undefined : setHover(false);
      }}
      cursor={isContext ? undefined : "pointer"}
      pointerEvents={isContext ? "none" : "all"}
    >
      <circle
        cx="50"
        cy="50"
        r={hover ? (size + 10) / 6 : size / 6}
        fill={selected ? theme.palette.primary.main : theme.palette.error.main}
        stroke="#fff"
        strokeWidth={3}
      ></circle>
    </svg>
  );
}

export default MapMarker;
