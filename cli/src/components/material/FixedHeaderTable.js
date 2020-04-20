import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "number", label: "번호", minWidth: 120, align: "center" },
  { id: "title", label: "제목", minWidth: 350, align: "left" },
  {
    id: "author",
    label: "작성자",
    minWidth: 150,
    align: "center",
  },
  {
    id: "date",
    label: "등록일",
    minWidth: 150,
    align: "center",
  },
  {
    id: "views",
    label: "조회수",
    minWidth: 150,
    align: "center",
  },
];

function createData(number, title, author, date, views) {
  return { number, title, author, date, views };
}

const rows = [
  createData(
    "1",
    "test testtest testtest testtest testtest testtest testtest testtest test",
    "윤상호",
    20200420,
    10
  ),
  createData("2", "test test", "김한주", 20200412, 100),
  createData("3", "test test", "송성민", 20200322, 1000),
  createData("4", "test test", "노재민", 20200419, 999),
  createData("4", "test test", "노재민", 20200419, 999),
  createData("4", "test test", "노재민", 20200419, 999),
  createData("4", "test test", "노재민", 20200419, 999),
  createData("4", "test test", "노재민", 20200419, 999),
  createData("4", "test test", "노재민", 20200419, 999),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  header: {
    fontWeight: "bold",
  },
});

export default function FixedHeaderTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.header}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
