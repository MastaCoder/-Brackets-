import { Container } from "@mui/material";
import { useContext, useState } from "react";
import DataContext from "../../../contexts/dataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import { uid } from "react-uid";

export default function AdminViewUserLogs() {
  const [data, setData] = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <Container component="main">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">TimeStamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.userLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uid(log)}>
                    <TableCell align="center">{log.user}</TableCell>
                    <TableCell align="center">{log.action}</TableCell>
                    <TableCell align="center">{log.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={data.userLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      ></TablePagination>
    </Container>
  );
}
