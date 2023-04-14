import { Box, List, ListItem, Stack } from "@mui/material";
import Postit from "./Postit";
import { events, ids } from "./processData";
import { DataEvent, PostIt, StateProps } from "./enums";
import { useMemo, useState } from "react";

export const basePostit: PostIt = {
  type: "Base",
  post_it_id: 1,
  event_ids: ids,
};

function PostitGroup(props: StateProps) {
  //const SavedPostits: Postit = [];
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
        events={basePostit.event_ids}
        indexKey={1}
        state={props.state}
        setState={props.setState}
      />
      ;
      {(props.state.postItGroups != undefined
        ? props.state.postItGroups
        : []
      ).map((p, index) => {
        return (
          <Postit
            events={p.event_ids}
            indexKey={index + 1}
            key={index}
            state={props.state}
            setState={props.setState}
          />
        );
      })}
    </Box>
  );
}

export default PostitGroup;
