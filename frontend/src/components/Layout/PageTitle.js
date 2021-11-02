import {Box, Typography} from "@mui/material";

export default function PageTitle(props) {
  return (
    <Box textAlign="center" mt={5} mb={2}>
      <Typography variant="h4" component="h1">
        {props.children}
      </Typography>
    </Box>
  )
}