import React, { useState, useEffect } from "react";
import { Button, Card, List, ListItem } from "@material-tailwind/react";
import axios from "axios";
import { Box } from "@mui/system";
import { CircularProgress, Typography, Modal, Paper } from "@mui/material";
import bswLogo from "../../assets/bswLogo.png";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CustomList from "../utils/CustomList";
import formatTimestamp from "../../components/time_formatter";

const StudentProf = () => {
  const [stud, setStud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { kerberos } = useParams();
  console.log(kerberos);

  useEffect(() => {
    // Fetch mentor data from the API
    const fetchMentorData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/moderator/admin/student/view/${kerberos}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (res.status === 200) {
            setStud(res.data);
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
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
          <p>Phone Number: {stud.phone_number}</p>
          <p>Email: {`${stud.kerberos}@iitd.ac.in`}</p>
          <p>Asked Queries: {stud.queries?.length}</p>

          {/* Activities List */}
          <h3 className="text-xl mt-4">Recent Activities</h3>
          <Typography className="text-gray-500">Recent Queries</Typography>
          <CustomList props={stud.queries} caller={handleViewDetails} />
        </Card>
      </div>
    </div>
  );
};

export default StudentProf;
