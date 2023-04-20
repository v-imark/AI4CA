import { Box, List, ListItem, Stack } from "@mui/material";
import Postit from "./Postit";
import { events, ids } from "./processData";
import { DataEvent, PostIt, StateProps } from "./enums";
import { useEffect, useMemo, useState } from "react";

export const basePostit: PostIt = {
  type: "All Events",
  post_it_id: 1,
  event_ids: ids,
};

function PostitGroup(props: StateProps) {
  useEffect(() => {
    console.log(props.state.selection);
    if (props.state.selection == undefined) console.log("frick");
  }, [props.state.selection]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "scroll",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Postit
        events={props.state.selection ? props.state.selection : basePostit}
        indexKey={1}
        state={props.state}
        setState={props.setState}
        selected={true}
      />
      {(props.state.postItGroups != undefined
        ? props.state.postItGroups
        : []
      ).map((p, index) => {
        return (
          <Postit
            events={p}
            indexKey={index + 2}
            key={index}
            state={props.state}
            setState={props.setState}
            selected={false}
          />
        );
      })}
    </Box>
  );
}

export default PostitGroup;
