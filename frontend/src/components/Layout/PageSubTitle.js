import {Box, Typography} from "@mui/material";

export default function PageSubTitle(props) {
  return (
    <Box mb={1}>
      <Typography variant="h5" component="h2">
        {props.children}
      </Typography>
    </Box>
  );
}