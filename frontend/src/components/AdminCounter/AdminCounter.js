import {Box, Grid, Paper, Typography} from "@mui/material";

export default function AdminCounter(props) {
  return (
    <Grid item xs={3}>
      <Paper elevation={3}>
        <Box px={2} py={1.25}>
          <Typography variant="h6">
            {props.title}
          </Typography>
          <Typography variant="h3">
            {props.number}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}