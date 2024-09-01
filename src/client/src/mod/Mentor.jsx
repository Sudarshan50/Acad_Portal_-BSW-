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

const Mentors = () => {
  const [mentor, setMentor] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const fetchMentor = async () => {
    try {
      const res = await axios.get(
        "https://acadbackend-bswiitdelhi.vercel.app/api/moderator/admin/mentor/view/",
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auth_token"),
          },
        }
      );
      if (res.status === 200) {
        setMentor(res.data.mentors);
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
          Mentors
        </Typography>
        <TableContainer
          component={Paper}
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mentor?.map((mentor) => (
                <TableRow key={mentor._id}>
                  <TableCell>{mentor.name}</TableCell>
                  <TableCell>{mentor.course}</TableCell>
                  <TableCell>{`${mentor.kerberos}@iitd.ac.in`}</TableCell>
                  <TableCell>{mentor.hours}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`profile/mentor/${mentor.kerberos}`}
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

export default Mentors;
