import { Box, List, ListItem, Stack } from "@mui/material";
import Postit from "./Postit";

function PostitGroup() {
  const postit = [1, 2, 3, 4, 5];
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
      {postit.map((index) => (
        <Postit events={[]} key={index} />
      ))}
    </Box>
  );
}
export default PostitGroup;
