import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import PageTitle from "../../../components/Layout/PageTitle";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import DataContext from "../../../contexts/dataContext";

export default function OrganizerCreatePage() {
  const history = useHistory();
  const [data, setData] = useContext(DataContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: 0,
    maxTeamSize: 0,
    public: true,
  });

  const onPublicChange = (v) => {
    setFormData({ ...formData, public: v });
  };

  const onChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hostingTournaments = data.hostingTournaments;
    const tournaments = data.tournaments;

    hostingTournaments.push({
      id: 1,
      status: 1,
      name: formData.name,
      description: formData.description,
      members: parseInt(formData.maxMembers),
      teams: parseInt(formData.maxTeamSize),
      public: formData.public,
    });

    tournaments.push({
      id: 1,
      status: 1,
      name: formData.name,
      description: formData.description,
      members: parseInt(formData.maxMembers),
      teams: parseInt(formData.maxTeamSize),
      public: formData.public,
    });


    setData({ ...data, hostingTournaments, tournaments });
    history.push("/user");
  };

  return (
    <Container maxWidth="md">
      <PageTitle>Create an event</PageTitle>

      <Box component="form" onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" size="large">
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
