import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MentNav } from "./ModNav";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const Students = () => {
  const [stud, setStud] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const fetchMentor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/moderator/admin/student/view/",
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auth_token"),
          },
        }
      );
      if (res.status === 200) {
        setStud(res.data.students);
        // console.log(res.data.mentors);
      }
    } catch (err) {
      toast.error("Error in fetching mentor");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", margin: 0, padding: 0 }}>
      {/* Integrated PrimarySearchAppBar */}
      <MentNav />

      <div style={{ paddingTop: 64, paddingLeft: 20, paddingRight: 20 }}>
        <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
          Students
        </Typography>
        <TableContainer
          component={Paper}
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stud?.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{`${student.kerberos}@iitd.ac.in`}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`profile/student/${student.kerberos}`}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Students;
