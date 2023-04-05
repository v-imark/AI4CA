import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import ContextMap from "./ContextMap";
import MainMap from "./MainMap";

//
import Userfilters from "./Userfilters";

function Mapcontainer() {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkblue",
        display: "flex",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "40%", width: "100%"}}>
          <ContextMap></ContextMap>
        </Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <Userfilters></Userfilters>
        </Box>
      </Box>

      <Box sx={{ width: "70%", backgroundColor: "lightgray" }}>
        <MainMap />
      </Box>
    </Card>
  );
}

export default Mapcontainer;
