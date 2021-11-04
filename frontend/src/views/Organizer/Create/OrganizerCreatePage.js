import {Box, Button, Checkbox, Container, FormControlLabel, TextField} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import {useState} from "react";

export default function OrganizerCreatePage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxMembers: 0,
    maxTeamSize: 0,
    public: true
  });

  const onPublicChange = (v) => {
    setFormData({...formData, public: v});
  }

  const onChange = (e) => {
    console.log(formData);
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <Container maxWidth="md">
      <PageTitle>
        Create an event
      </PageTitle>

      <Box component="form">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          onChange={(e) => onChange(e)}
        />
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
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          label="Maximum members"
          name="maxMembers"
          onChange={(e) => onChange(e)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          label="Team Size"
          name="maxTeamSize"
          onChange={(e) => onChange(e)}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Public"
          onChange={(e) => onPublicChange(e.target.checked)}
        />
        <Box textAlign="center" mt={1}>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}