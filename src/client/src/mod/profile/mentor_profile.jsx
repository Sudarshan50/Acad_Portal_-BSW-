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

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { kerberos } = useParams();

  useEffect(() => {
    // Fetch mentor data from the API
    const fetchMentorData = async () => {
      try {
        const res = await axios.get(
          `https://acadbackend-bswiitdelhi.vercel.app/api/moderator/admin/mentor/view/${kerberos}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (res.status === 200) {
          setMentor(res.data);
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

  if (!mentor)
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
          <h2 className="text-2xl font-semibold relative left-40 mb-2">
            {mentor.name}
          </h2>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold" }}
            className=" text-purple-500"
          >
            Role: Academic Mentor
          </Typography>
          <p>Email: {`${mentor.kerberos}@iitd.ac.in`}</p>
          <p>Hours: {mentor.hours}</p>
          <p>Posted Opportunities: {mentor.opportunities?.length}</p>
          <p>Queries Taken: {mentor.queries?.length}</p>

          {/* Activities List */}
          <h3 className="text-xl mt-4">Recent Activities</h3>
          <Typography className="text-gray-500">Recent Queries</Typography>
          <CustomList props={mentor.queries} caller={handleViewDetails} />
          <Typography className="text-gray-500">
            Recent Opportunities
          </Typography>
          <CustomList props={mentor.opportunities} caller={handleViewDetails} />
          <Typography className="text-gray-500">Recent Attendances</Typography>
          <List>
            {mentor.attendance?.map((item) => (
              <ListItem key={item._id}>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginRight: "2em",
                  }}
                >
                  {item.description.substr(0, 10) + "...."}
                </p>
                <p className="mr-1">Marked On: {formatTimestamp(item.date)}</p>
                {item.hours > 0 ? (
                  <p
                    className="ml-2"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    Assigned Hours- {item?.hours}
                  </p>
                ) : (
                  <p className="ml-2" style={{ color: "red" }}>
                    AssignedHours- NILL
                  </p>
                )}
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default MentorProfile;
