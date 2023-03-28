import { Card, CardContent, CardHeader } from "@mui/material";
import * as d3 from "d3";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { theme } from "./theme";
import { useDimensions } from "./useDimensions";

type HistogramProps = {
  data?: number[];
  dates: Date[];
};

function Histogram(props: HistogramProps) {
  const ref = useRef<HTMLInputElement>(null);
  const axesRef = useRef<SVGAElement>(null);
  const { width, height } = useDimensions(ref);
  const BUCKET_PADDING = 4;
  const parseTime = d3.timeParse("%Y-%m-%d");
  const dateTimeExtent = d3.extent(props.dates, function (d) {
    return d;
  }) as [Date, Date];
  console.log(dateTimeExtent);
  dateTimeExtent[1] = d3.timeDay.offset(dateTimeExtent[1], 1);

  const bins = d3.timeDay.range(
    d3.timeDay.offset(dateTimeExtent[0], -1),
    d3.timeDay.offset(dateTimeExtent[1], 1),
    1
  );

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain(dateTimeExtent)
      .range([40, width - 20]);
  }, [props.data, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin<Date, Date>()
      .value((d) => d)
      .domain(dateTimeExtent)
      .thresholds(bins);
    return bucketGenerator(props.dates);
  }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));

    return d3.scaleLinear().range([height, 0]).domain([0, max]);
  }, [props.data, height]);

  const binColor = (n: number) => {
    if (n > 8) return theme.palette.error;
    if (n > 5) return theme.palette.warning;

    return theme.palette.success;
  };

  const allRects = buckets.map((bucket, i) => {
    if (bucket.x0 == undefined || bucket.x1 == undefined) {
      return null;
    }
    return (
      <rect
        key={i}
        fill={theme.palette.success.main}
        stroke={theme.palette.success.main}
        x={xScale(bucket.x0) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
        y={yScale(bucket.length) - 20}
        height={height - yScale(bucket.length)}
      />
    );
  });

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
      <svg width={width} height={height}>
        {allRects}
      </svg>
    </div>
  );
}

export default Histogram;
