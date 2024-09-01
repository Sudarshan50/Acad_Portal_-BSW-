// Modify the given code for mentor whose code look like somethinhg like this:-
// src/MentorDashboard.js
import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Paper,
  Typography,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Button } from "@material-tailwind/react";
import LoupeIcon from "@mui/icons-material/Loupe";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { MentNav } from "./MentNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import formatTimestamp from "../components/time_formatter";
const Dashboard = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([{}]);
  const [opportunities, setOpportunities] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mentId, setMentId] = useState("");

  const fetchQueries = async () => {
    try {
      const res = await axios.get("https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/queries", {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      setQueries(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/opportunity/all`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        setOpportunities(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchMentorId = async () => {
    try {
      const res = await axios.get(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/auth/details/${Cookies.get(
          "kerberos"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status === 200) {
        setMentId(res.data._id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMentorId();
    fetchQueries();
    fetchOpportunities();
  }, []);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };
  const handleTakeQuery = async () => {
    // Display a loading toast and save the toast ID to update later
    const toastId = toast.loading("Processing your request...");

    try {
      const res = await axios.post(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/queries/${selectedItem._id}`,
        {
          kerberos: Cookies.get("kerberos"),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("Query taken successfully");
        fetchQueries();
        toast.update(toastId, {
          render: "Query taken successfully",
          type: "success",
          isLoading: false,
          autoClose:2000,
        });
        handleClose();
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: "Error taking query",
        type: "error",
        isLoading: false,
        autoClose:2000,
      });
    }
  };
  const handleDeletOpp = async () => {
    const toastId = toast.loading("Deleting opportunity...");
    try {
      const res = await axios.delete(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/opportunity/post/${selectedItem._id}`,
        {
          data:{
            kerberos: Cookies.get("kerberos"),
          },
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.update(toastId, {
          render: "Opportunity deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchOpportunities();
        handleClose();
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Error deleting opportunity",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.log(err);
    }
  };
  const handleTakeOppurtunity = async () => {
    const toastId = toast.loading("Processing your request...");

    try {
      const res = await axios.post(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/opportunity/take/${selectedItem._id}`,
        {
          kerberos: Cookies.get("kerberos"),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.update(toastId, {
          render: "Opportunity taken successfully",
          type: "success",
          isLoading: false,
          autoClose:2000,
        });
        handleClose();
      }
      console.log(res.data);
    } catch (err) {
      toast.update(toastId, {
        render: "Expired!",
        type: "error",
        isLoading: false,
        autoClose:2000,
      });
      console.log(err);
    }
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    switch (selectedItem.type) {
      case "takenQuery":
        return (
          <>
            <Typography variant="h6">Query Details</Typography>
            <Typography variant="body1">
              Description: {selectedItem.description}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Queried By: {selectedItem.student.name},{" "}
              {selectedItem.student.kerberos.toUpperCase()}
              <Button
                className="ml-2 mr-2"
                size="sm"
                color="lime"
                onClick={() => {
                  navigate(
                    `/mentor/profile/student/${selectedItem.student.kerberos}`
                  );
                }}
              >
                View Profile
              </Button>
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Student Phone: {selectedItem.student.phone_number}
            </Typography>
            <Typography variant="body1">
              Taken At: {formatTimestamp(selectedItem.taken_at)}
            </Typography>
            {selectedItem.attachments &&
              selectedItem.attachments.length > 0 && (
                <>
                  <Typography variant="body1">Attachments:</Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      overflow: "scroll",
                    }}
                  >
                    {selectedItem.attachments.map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment}
                        alt={`Attachment ${index + 1}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          marginBottom: "2em",
                          marginTop: "0.8em",
                          marginRight: "0.8em",
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="subtitle2" fontWeight="bold" color="red">
                    Note:- To view the image right click on it and view on new
                    tab
                  </Typography>
                </>
              )}
          </>
        );
      case "availableQuery":
        return (
          <>
            <Typography variant="h6">Query Details</Typography>
            <Typography variant="body1">
              Description: {selectedItem.description}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Queried By: {selectedItem.student.name},{" "}
              {selectedItem.student.kerberos.toUpperCase()}
              <Button
                className="ml-2 mr-2"
                size="sm"
                color="lime"
                onClick={() => {
                  navigate(
                    `/mentor/profile/student/${selectedItem.student.kerberos}`
                  );
                }}
              >
                View Profile
              </Button>
            </Typography>
            {selectedItem.attachments &&
              selectedItem.attachments.length > 0 && (
                <>
                  <Typography variant="body1">Attachments:</Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      overflow: "scroll",
                    }}
                  >
                    {selectedItem.attachments.map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment}
                        alt={`Attachment ${index + 1}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          marginBottom: "2em",
                          marginTop: "0.8em",
                          marginRight: "0.8em",
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="subtitle2" fontWeight="bold" color="red">
                    Note:- To view the image right click on it and view on new
                    tab
                  </Typography>
                </>
              )}
            <Button
              style={{ padding: "15px", margin: "1em" }}
              variant="contained"
              color="primary"
              onClick={handleTakeQuery}
            >
              Take Up
            </Button>
            {/* <Button
              style={{ padding: "15px" }}
              variant="contained"
              onClick={() => navigate(`/mentor/view_query/${selectedItem._id}`)}
            >
              View Query
            </Button> */}
          </>
        );
      case "floatedOpportunity":
        return (
          <>
            <Typography variant="h6">
              Info: {selectedItem.description}
            </Typography>
            <Typography variant="h6">
              Course: {selectedItem.course.toUpperCase()}
            </Typography>
            <Typography variant="h6">
              Created By: {(selectedItem?.creator?.kerberos).toUpperCase()}
            </Typography>
            <Typography variant="subtitle1">
              Expired By: {formatTimestamp(selectedItem.end)}
            </Typography>
            {selectedItem.state === "AVAILABLE" ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-2"
                  onClick={handleDeletOpp}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Typography variant="body1" fontWeight="bold">
                Taken by:{" "}
                {selectedItem.taker?.kerberos
                  ? (selectedItem.taker?.kerberos).toUpperCase()
                  : "No one"}
              </Typography>
            )}
          </>
        );
      case "otherOpportunity":
        return (
          <>
            <Typography variant="h6">
              Info: {selectedItem.description}
            </Typography>
            <Typography variant="h6">Course: {selectedItem.course}</Typography>
            <Typography variant="h6">
              Created By: {selectedItem.creator?.kerberos}
            </Typography>
            <div>
              <Typography variant="h7">
                End: {formatTimestamp(selectedItem.end)}
              </Typography>
            </div>
            <Button variant="contained" onClick={handleTakeOppurtunity}>
              Take Up
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100vw", height: "max-content", minHeight: "100vh" }}>
      <MentNav />
      <Box
        display="flex"
        flexDirection="column"
        marginTop="40px"
        sx={{ mx: "10%" }}
      >
        <Card sx={{ minWidth: 150, width: 300, my: "30px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Get started
            </Typography>
            <Typography variant="h5" component="div">
              Actions
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              startIcon={<LoupeIcon />}
              variant="contained"
              onClick={() => navigate("/mentor/mark_attendance")}
            >
              Mark Attendance
            </Button>
            <Button
              size="small"
              startIcon={<LoupeIcon />}
              variant="contained"
              onClick={() => navigate("/mentor/float_opportunity")}
            >
              Float Opportunity
            </Button>
          </CardActions>
        </Card>

        <Typography variant="h5" component="div">
          Taken Queries
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2f0f5",
            py: "30px",
            mb: "30px",
          }}
          alignItems={!queries && "center"}
        >
          {queries ? (
            queries
              .filter((q) => q.status === "TAKEN" && q.mentor === mentId)
              .map((query) => (
                <ListItem
                  button
                  key={query._id}
                  onClick={() => handleOpen({ ...query, type: "takenQuery" })}
                >
                  <ListItemText
                    primary={`[${query.type}]: ${
                      query.description.length > 50
                        ? query.description.substring(0, 50) + "...."
                        : query.description
                    }`}
                  />
                </ListItem>
              ))
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Typography variant="h5" component="div">
          Available Queries
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2f0f5",
            py: "30px",
            mb: "30px",
          }}
          alignItems={!queries && "center"}
        >
          {queries ? (
            queries
              .filter((q) => q.status === "AVAILABLE")
              .map((query) => (
                <ListItem
                  button
                  key={query._id}
                  onClick={() =>
                    handleOpen({ ...query, type: "availableQuery" })
                  }
                >
                  <ListItemText
                    primary={`[${query.type}]: ${
                      query.description.length > 50
                        ? query.description.substring(0, 50) + "...."
                        : query.description
                    }`}
                  />
                </ListItem>
              ))
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Typography variant="h5" component="div">
          Floated Opportunities By Me
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2f0f5",
            py: "30px",
            mb: "30px",
          }}
          alignItems={!opportunities && "center"}
        >
          {opportunities ? (
            opportunities
              .filter((op) => op.creator?._id === Cookies.get("mentId"))
              .map((opportunity) => (
                <ListItem
                  button
                  key={opportunity._id}
                  onClick={() =>
                    handleOpen({ ...opportunity, type: "floatedOpportunity" })
                  }
                >
                  <ListItemText
                    primary={`[${
                      opportunity.course
                    }]: ${opportunity.description?.substring(0, 100)}...`}
                  />
                  <ListItemText>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color={
                        opportunity.state === "TAKEN" ? "green" : "blueviolet"
                      }
                    >
                      State: {opportunity.state}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Typography variant="h5" component="div">
          Other Available Opportunities
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2f0f5",
            py: "30px",
            mb: "30px",
          }}
          alignItems={!opportunities && "center"}
        >
          {opportunities ? (
            opportunities
              .filter((op) => op.creator?._id !== Cookies.get("mentId"))
              .map((opportunity) => (
                <ListItem
                  button
                  key={opportunity._id}
                  onClick={() =>
                    handleOpen({ ...opportunity, type: "otherOpportunity" })
                  }
                >
                  <ListItemText
                    primary={`[${
                      opportunity.course
                    }]: ${opportunity.description?.substring(0, 100)}...`}
                  />
                </ListItem>
              ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: 600,
            maxHeight: 700,
            overflow: "scroll",
            overflowBlock: "scroll",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {renderModalContent()}
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
