import Box from "@mui/material/Box";
import MainMap from "./MainMap";

//
import Userfilters from "./Userfilters";

function Mapcontainer() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkblue",
        display: "flex",
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
        <Box sx={{ height: "40%", width: "100%" }}></Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <Userfilters></Userfilters>
        </Box>
      </Box>

      <Box sx={{ width: "70%", backgroundColor: "lightgray" }}>
        <MainMap />
      </Box>
    </Box>
  );
}

export default Mapcontainer;
