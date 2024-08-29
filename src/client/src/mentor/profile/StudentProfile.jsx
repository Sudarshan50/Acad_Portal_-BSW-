import React, { useState, useEffect } from "react";
import { Button, Card, List, ListItem } from "@material-tailwind/react";
import axios from "axios";
import { Box } from "@mui/system";
import { CircularProgress, Typography, Modal, Paper } from "@mui/material";
import bswLogo from "../../assets/bswLogo.png";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import formatTimestamp from "../../components/time_formatter";

const StudentProfile = () => {
  const [stud, setStud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { kerberos } = useParams();

  useEffect(() => {
    const fetchStudentdata = async () => {
      try {
        const res = await axios.get(
          `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/admin/student/view/${kerberos}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (res.status === 200) {
          setStud(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudentdata();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  if (!stud)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "25rem",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div className="flex p-6">
      {/* Left Section: Mentor Photo */}
      <div className="w-1/3">
        <img src={bswLogo} alt="Mentor" className="rounded-lg w-full h-auto" />
      </div>

      {/* Right Section: Mentor Info */}
      <div className="w-2/3 pl-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold relative left-80 mb-2">
            {stud.name}
          </h2>
          <p>Email: {`${stud.kerberos}@iitd.ac.in`}</p>
          <p>Phone_Number: {stud.phone_number}</p>
          <p>Queries Asked: {stud.queries?.length}</p>

          {/* Activities List */}
          <h3 className="text-xl mt-4">Recent Activities</h3>
          <List>
            {stud.queries?.map((query, index) => (
              <ListItem key={index}>
                {query.description}
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "1em",
                  }}
                >
                  {query.status}
                </p>
                {/* <Button
                  className="ml-auto"
                  size="sm"
                  // onClick={() => caller(query._id)}
                >
                  View Details
                </Button> */}
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
