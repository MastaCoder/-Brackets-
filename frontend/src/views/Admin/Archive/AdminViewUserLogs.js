import { Container } from "@mui/material";
import { useState } from "react";
import PaginatedTable from "../../../components/Table/PaginatedTable";

const userLogs = [
  {
    user: "dannyboy18",
    action: "Tournament Creation",
    date: Date().toLocaleString(),
  },
  {
    user: "dannyboy18",
    action: "Tournament Join",
    date: Date().toLocaleString(),
  },
  {
    user: "dannyboy18",
    action: "Profile Update",
    date: Date().toLocaleString(),
  },
];

export default function AdminViewUserLogs() {
  const [logs, setUserLogs] = useState(userLogs);

  return (
    <Container component="main">
      <PaginatedTable columns={["User", "Action", "TimeStamp"]} rows={logs} />
    </Container>
  );
}
