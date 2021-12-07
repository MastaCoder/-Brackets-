import {
  Box, Button,
  Checkbox,
  FormControlLabel, Modal, TextField
} from "@mui/material";
import {useState} from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function TournamentUpdateModal(props) {
  const [formData, setFormData] = useState({
    description: props.description,
    public: props.public,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPublicChange = (v) => {
    setFormData({ ...formData, public: v });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateTournament(formData.description, formData.public);
    props.handleClose(true);
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            defaultValue={formData.description}
            onChange={(e) => onChange(e)}
          />
          <FormControlLabel
            control={formData.public ? <Checkbox defaultChecked /> : <Checkbox />}
            label="Public"
            onChange={(e) => onPublicChange(e.target.checked)}
          />
          <Box textAlign="center" mt={1}>
            <Button type="submit" variant="contained" size="large">
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
