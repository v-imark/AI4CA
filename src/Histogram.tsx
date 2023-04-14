import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import * as d3 from "d3";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Warning } from "./enums";
import { theme } from "./theme";
import ReportIcon from "@mui/icons-material/Report";
import { useDimensions } from "./useDimensions";
import { Warnings } from "./processData";

type HistogramProps = {
  data: any[];
  dateTimeExtent: [Date, Date];
  binSize: 0 | number;
};

function Histogram({ data, dateTimeExtent, binSize }: HistogramProps) {
  const ref = useRef<HTMLInputElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const { width, height } = useDimensions(ref);

  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);
  const [hoveredWarning, setHoveredWarning] = useState<number | null>(null);

  const BUCKET_PADDING = 4;
  const MARGIN = 10;
  const parseTime = d3.timeParse("%Y-%m-%d");

  const bins = d3.timeHour.range(
    d3.timeHour.offset(dateTimeExtent[0], -24),
    d3.timeHour.offset(dateTimeExtent[1], 24),
    binSize * 12
  );

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain(dateTimeExtent)
      .range([40, width - 20]);
  }, [dateTimeExtent, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin<Date, Date>()
      .value((d) => d)
      .domain(dateTimeExtent)
      .thresholds(bins);
    return bucketGenerator(data.map((item) => item.created_at));
  }, [xScale, bins]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));

    return d3
      .scaleLinear()
      .range([height - 20, -8])
      .domain([0, max * 1.2]);
  }, [buckets, height]);

  const allRects = buckets.map((bucket, i) => {
    if (bucket.x0 == undefined || bucket.x1 == undefined) {
      return null;
    }

    const bucketWidth = xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING;
    const bucketHeight = height - yScale(bucket.length) - 20;
    const x = xScale(bucket.x0) + BUCKET_PADDING / 2;
    const y = yScale(bucket.length);

    return (
      <rect
        key={i}
        fill={
          i == selectedBucket
            ? theme.palette.primary.main
            : theme.palette.success.main
        }
        stroke={theme.palette.success.main}
        x={x}
        width={bucketWidth}
        y={y}
        height={bucketHeight}
        onClick={() => setSelectedBucket((prev) => (prev == i ? null : i))}
        cursor="pointer"
      ></rect>
    );
  });

  const warningMarkers = Warnings.map((warning, index) => {
    const x = xScale(warning.time);
    const size = index == hoveredWarning ? 30 : 24;
    const offset = hoveredWarning == index ? 3 : 0;

    return (
      <>
        <svg
          width={size}
          height={size}
          x={x - size / 2}
          y={yScale.range()[1] + 8 - offset}
          onMouseEnter={() => {
            setHoveredWarning(index);
          }}
          onMouseLeave={() => {
            setHoveredWarning(null);
          }}
          pointerEvents="bounding-box"
        >
          <Tooltip
            title={warning.time.toLocaleDateString() + ": " + warning.text}
          >
            <ReportIcon
              fontSize={index == hoveredWarning ? "small" : "large"}
              color="error"
            />
          </Tooltip>
        </svg>

        <line
          x1={x}
          y1={yScale.range()[0]}
          x2={x}
          y2={yScale.range()[1] + 28}
          stroke={theme.palette.error.main}
          strokeWidth={2}
          strokeDasharray="3 3"
        />
      </>
    );
  });

  useEffect(() => {
    const svg = d3.select(graphRef.current);
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();

    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - 20})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(yAxis).attr("transform", `translate(${40},${0})`);

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -80)
      .text("Events");
  }, [xScale, yScale, graphRef]);

  return (
    <div
      style={{
        height: "98%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      ref={ref}
    >
      <svg ref={graphRef} width={width} height={height}>
        {allRects}
        {warningMarkers}
      </svg>
    </div>
  );
}

export default Histogram;
