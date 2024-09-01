import * as React from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { memo } from "react";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { toast } from "react-toastify";
import formatTimestamp from "./time_formatter";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { red } from "@mui/material/colors";
function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];
function descendingComparator(a, b, orderBy) {
  if (orderBy === "raised_at") {
    // Convert ISO date strings to Date objects for accurate comparison
    const dateA = new Date(a[orderBy]);
    const dateB = new Date(b[orderBy]);
    if (dateB < dateA) {
      return -1;
    }
    if (dateB > dateA) {
      return 1;
    }
    return 0;
  }

  // Default comparison for other fields
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "student",
    numeric: false,
    disablePadding: true,
    label: "Student",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "mentor",
    numeric: true,
    disablePadding: false,
    label: "Mentor",
  },
  {
    id: "raised_at",
    numeric: true,
    disablePadding: false,
    label: "Raised At",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Course/Type",
  },
];

// Inside EnhancedTableHead component
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// EnhancedTableHead PropTypes
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Query
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Row({ row, isItemSelected, labelId, mode, openDialog }) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format: HH:MM
    return `${formattedDate} ${formattedTime}`;
  };
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleStaus = (current_status) => {
    if (current_status === "QUEUED") {
      return "Yet to be Floated";
    } else if (current_status === "TAKEN") {
      return "Taken by a Mentor";
    } else if (current_status === "RESOLVED") {
      return "Resolved";
    } else if (current_status === "REJECTED") {
      return "Resolved";
    } else if (current_status === "APPROVED") {
      return "Resolved";
    } else if (current_status === "DISMISSED") {
      return "Dismissed by Mod";
    } else if (current_status === "AVAILABLE") {
      return "Floated to Mentor";
    }
  };

  const handledelete = async () => {
    // Display a loading toast and save the toast ID to update later
    const toastId = toast.loading("Deleting your query...");

    try {
      const res = await axios.delete(
        `https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/delete/${row._id}`,
        {
          data: { kerberos: Cookies.get("kerberos") },
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.update(toastId, {
          render: "Query deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        toast.warning("Please refresh the query list to see the changes");
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: "Error deleting query",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          onClick={() => {
            navigate("/student/view_queries/" + row._id);
          }}
        >
          {/* {(row.description).substring(0,)}
           */}
          {row.description.length > 40
            ? row.description.substring(0, 50) + "..."
            : row.description}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => {
            navigate("/student/view_queries/" + row._id);
          }}
        >
          {handleStaus(row.status)}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => {
            navigate("/student/view_queries/" + row._id);
          }}
        >
          {row.mentor_name}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => {
            navigate("/student/view_queries/" + row._id);
          }}
        >
          {formatDateTime(row.raised_at)}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => {
            navigate("/student/view_queries/" + row._id);
          }}
        >
          {row.type}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.status === "QUEUED" ? (
              <Box>
                <Button
                  onClick={() => {
                    navigate("/student/update_queries/" + row._id);
                  }}
                  style={{
                    background: "blue",
                    color: "white",
                    marginTop: "0.5em",
                    marginLeft: "0.5em",
                    marginRight: "0.5em",
                    padding: "5px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={handledelete}
                  style={{
                    background: "red",
                    color: "white",
                    marginTop: "0.5em",
                    marginLeft: "0.5em",
                    marginRight: "0.5em",
                    padding: "5px",
                  }}
                >
                  Delete
                </Button>
              </Box>
            ) : null}
            <Box sx={{ margin: 1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ margin: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  Query Quick View
                </Typography>
                {row.feedback && (
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <strong>Feedback:</strong> {"New Feedback"}
                  </Typography>
                )}
                <Typography variant="subtitle1" gutterBottom component="div">
                  <strong>Description:</strong>{" "}
                  {row.description.length > 100
                    ? row.description.substring(0, 100) + "..."
                    : row.description}
                </Typography>
                {row.attachments.length !== 0 && (
                  <Box position="relative" display="inline-block">
                    {row.attachments.map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment}
                        alt="Attachment"
                        style={{
                          width: "100px",
                          height: "100px",
                          zIndex: 0,
                          display: "inline-block",
                          padding: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                    <Typography variant="body2" fontWeight="bold" color="red">
                      Note:- To view the image right click on it and open in new
                      tab.
                    </Typography>
                  </Box>
                )}
              </Box>
              {row.status === "RESOLVED" ||
              row.status === "REJECTED" ||
              row.status === "APPROVED" ||
              row.status === "TAKEN" ? (
                <Box sx={{ margin: 4 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Mentor Info: {(row.mentor?.kerberos).toUpperCase()}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <strong>Name:</strong> {row?.mentor_name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <strong>Contact:</strong> {row.mentor?.phone_number}
                  </Typography>
                  {row.status === "RESOLVED" || row.status === "APPROVED" ? (
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      <strong>Resolved At:</strong>{" "}
                      {formatTimestamp(row?.resolved_at)}
                    </Typography>
                  ) : null}
                </Box>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Querylist({ mode, data }) {
  const [order, setOrder] = useState("desc"); // Default sorting order
  const [orderBy, setOrderBy] = useState("raised_at"); // Default sorting by Raised At
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Sorting the rows
  const sortedRows = stableSort(data, getComparator(order, orderBy));

  const visibleRows = React.useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows]
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {/* Dialog and other components */}
      <Paper sx={{ width: "90%" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 300 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={() => {}}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Row
                    key={row._id}
                    row={row}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    mode={mode}
                    openDialog={() => setOpen(true)}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
