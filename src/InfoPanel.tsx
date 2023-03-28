import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function InfoPanel() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100%", width: "100%", margin: 0 }}
    >
      <Grid item xs={6} sx={{ height: "100%", width: "100%", margin: 0 }}>
        <Card>
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <List
              sx={{
                position: "relative",
                overflow: "auto",
                width: "100%",
                maxHeight: 360,
                margin: 0,
              }}
            >
                <Divider/>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <ListItem key={index}>
                    <ListItemButton>
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${index + 1}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
              <Divider/>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ height: "100%", width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/src/BlueEyesArt.jpg"
              alt="Blue eyes"
            />
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              BlueEyes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default InfoPanel;
