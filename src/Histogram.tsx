import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import * as d3 from "d3";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { PostIt, StateStore, Warning } from "./enums";
import { theme } from "./theme";
import ReportIcon from "@mui/icons-material/Report";
import { useDimensions } from "./useDimensions";
import { Warnings } from "./processData";
import React from "react";

type HistogramProps = {
  data: {
    id: number;
    created_at: Date;
    pred_on_topic: number;
    pred_off_topic: number;
  }[];
  dateTimeExtent: [Date, Date];
  binSize: 0 | number;
  setState: React.Dispatch<React.SetStateAction<StateStore>>;
};

function Histogram({
  data,
  dateTimeExtent,
  binSize,
  setState,
}: HistogramProps) {
  const ref = useRef<HTMLInputElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const { width, height } = useDimensions(ref);

  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);
  const [hoveredWarning, setHoveredWarning] = useState<number | null>(null);

  const handleBucketClick = (
    bucket: d3.Bin<
      {
        id: number;
        created_at: Date;
        pred_on_topic: number;
        pred_off_topic: number;
      },
      Date
    >,
    i: number
  ) => {
    const newSelectedPostIt: PostIt = {
      type: "Temporal",
      post_it_id: i,
      event_ids: bucket.map((item) => item.id),
    };

    setState(
      (prev: StateStore) =>
        ({
          postItGroups: prev.postItGroups,
          data: prev.data,
          selection: newSelectedPostIt,
        } as StateStore)
    );
    setSelectedBucket((prev) => (prev == i ? null : i));
  };

  const BUCKET_PADDING = 4;

  const parseTime = d3.timeParse("%Y-%m-%d");

  const bins = d3.timeHour.range(
    d3.timeHour.offset(dateTimeExtent[0]),
    d3.timeHour.offset(dateTimeExtent[1]),
    binSize * 24
  );

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain(dateTimeExtent)
      .range([40, width - 20]);
  }, [dateTimeExtent, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin<
        {
          id: number;
          created_at: Date;
          pred_on_topic: number;
          pred_off_topic: number;
        },
        Date
      >()
      .value((d) => d.created_at)
      .domain(dateTimeExtent)
      .thresholds(bins);
    return bucketGenerator(data);
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

    const tooltipText = `Events:  ${bucket.length}`;

    return (
      <Tooltip title={tooltipText} placement="top" key={x}>
        <rect
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
          onClick={() => handleBucketClick(bucket, i)}
          cursor="pointer"
        ></rect>
      </Tooltip>
    );
  });

  const warningMarkers = Warnings.map((warning, index) => {
    const x = xScale(warning.time);
    const size = index == hoveredWarning ? 30 : 24;
    const offset = hoveredWarning == index ? 3 : 0;

    return (
      <React.Fragment key={x}>
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
      </React.Fragment>
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
