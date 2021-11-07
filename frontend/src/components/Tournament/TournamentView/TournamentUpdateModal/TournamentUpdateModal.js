import {
  Modal,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {useState, useContext} from "react";
import DataContext from "../../../../contexts/dataContext";

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
  const [data, setData] = useContext(DataContext);

  const [formData, setFormData] = useState({
    description: "",
    public: true,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPublicChange = (v) => {
    setFormData({ ...formData, public: v });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tournaments = [...data.tournaments];
    console.log(tournaments);
    tournaments[props.id - 1].description = formData.description;
    tournaments[props.id - 1].public = formData.public;
    setData({ ...data, tournaments });
    props.handleClose();
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
            onChange={(e) => onChange(e)}
          />
          <FormControlLabel
            control={props.public ? <Checkbox defaultChecked /> : <Checkbox />}
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
