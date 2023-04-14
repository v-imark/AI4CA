import { DateRange } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Popover,
  Slider,
  SliderValueLabelProps,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useMemo, useRef, useState } from "react";
import Histogram from "./Histogram";
import { timeData } from "./processData";
import { StateProps, StateStore } from "./enums";

interface TimelineProps extends StateProps {
  dateRange: [Date, Date];
  setDateRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

function Timeline(props: TimelineProps) {
  const [binSize, setBinSize] = useState(1);

  //const data_ids = useBearStore((state) => state.data);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const data = useMemo(() => {
    const newData = timeData.filter((item) =>
      props.state.data.find((id) => item.id == id)
    );
    return newData;
  }, [props.dateRange, props.state.data]);

  function ValueLabelComponent(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip
        enterTouchDelay={0}
        placement="top"
        title={"Days: " + value}
        arrow
      >
        {children}
      </Tooltip>
    );
  }

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <Grid
        container
        direction="column"
        spacing={0}
        alignItems="center"
        sx={{ height: "100%", width: "100%", margin: 0 }}
      >
        <Grid item xs={2} sx={{ width: "100%" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            paddingX={2}
          >
            <Typography sx={{ alignSelf: "center" }}>Bin Size:</Typography>
            <Box width={"20%"} paddingTop={1}>
              <Slider
                value={binSize}
                min={0.5}
                size="small"
                aria-label=""
                max={5}
                sx={{ alignSelf: "center" }}
                step={0.5}
                slots={{ valueLabel: ValueLabelComponent }}
                valueLabelDisplay="auto"
                onChange={(event, value) => setBinSize(value as number)}
              />
            </Box>
            <Typography sx={{ alignSelf: "center" }}>Date Range:</Typography>
            <IconButton sx={{ marginLeft: -1 }} onClick={handleClick}>
              <DateRange />
            </IconButton>
          </Stack>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box display="flex" flexDirection="column">
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: 180, margin: 1 }}
                  value={props.dateRange[0]}
                  onChange={(value) =>
                    props.setDateRange(
                      (prev: [Date, Date]) => [value, prev[1]] as [Date, Date]
                    )
                  }
                />
                <DatePicker
                  label="End Date"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: 180, margin: 1 }}
                  value={props.dateRange[1]}
                  onChange={(value) =>
                    props.setDateRange(
                      (prev: [Date, Date]) => [prev[0], value] as [Date, Date]
                    )
                  }
                />
              </Box>
            </LocalizationProvider>
          </Popover>
        </Grid>
        <Grid item xs={10} sx={{ width: "100%" }}>
          <Histogram
            data={data}
            dateTimeExtent={props.dateRange}
            binSize={binSize}
            setState={props.setState}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default Timeline;
