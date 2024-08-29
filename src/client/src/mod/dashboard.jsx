import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { MentNav } from "./ModNav";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import handleData from "./utils/dataHandler.js";
import ModActionAwaitedQuery from "./Modals/ModActionAwaitedQuery.jsx";
import ModActionAwaitedAttendance from "./Modals/ModActionAwaitedAttendace.jsx";
import PastActivitiesDismissQuery from "./Modals/PastActivitiesQueries.jsx";
import PastActivityAttendace from "./Modals/PastActivityAttendace.jsx";
import OngoingActivitesQuery from "./Modals/OngoingAcitivitesQuery.jsx";
import OngoingAcitivitesOppurtunites from "./Modals/OngoingActivitiesOpputunities.jsx";
import formatTimestamp from "../components/time_formatter.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState({});
  const [queries, setQueries] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [modQueries, setModQueries] = useState({});
  const [ongoingActivities, setOngoingActivities] = useState({});
  const [pastActivities, setPastActivities] = useState({});
  const fetechQueries = async () => {
    try {
      const attendance = await axios.get(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/attendance/" +
          Cookies.get("kerberos"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auth_token"),
          },
        }
      );
      const queries = await axios.get(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/queries/" +
          Cookies.get("kerberos"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auth_token"),
          },
        }
      );
      const opportunities = await axios.get(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/opportunities/" +
          Cookies.get("kerberos"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auth_token"),
          },
        }
      );
      if (
        !attendance.status === 200 ||
        !queries.data === 200 ||
        !opportunities.data === 200
      ) {
        toast.error("Error fetching data");
      }
      if (attendance.status === 200) {
        setAttendance(attendance.data);
      }
      if (queries.status === 200) {
        setQueries(queries.data);
      }
      if (opportunities.status === 200) {
        setOpportunities(opportunities.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetechQueries();
  }, []);

  const dataHandler = () => {
    const handledData = handleData(queries, attendance, opportunities);
    setModQueries(handledData.modQueries);
    setOngoingActivities(handledData.ongoingActivities);
    setPastActivities(handledData.pastActivities);
  };
  useEffect(() => {
    dataHandler();
  }, [attendance, queries, opportunities]);
  console.log(opportunities);

  const handleViewQuery = (id) => {
    console.log(id);
  };
  const handleItemClick = (item, type) => {
    setSelectedItem({ item, type });
  };
  console.log(selectedItem);
  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <MentNav />
      <div
        style={{ width: "100vw", height: "max-content", minHeight: "100vh" }}
      >
        {/* mod action section */}
        <Box sx={{ mx: "10%", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Mod Action Awaited
          </Typography>
          <Typography variant="h7" gutterBottom mt={4}>
            Queries
            <Box
              display="flex"
              marginTop={1.5}
              marginBottom={1.5}
              flexDirection="row"
              flexWrap="wrap"
              gap={2}
            >
              {modQueries.queries?.length ? (
                modQueries.queries.map((query) => (
                  <Card key={query._id} sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6">{query.description}</Typography>
                      <Typography color="text.secondary">
                        State: {query.status}
                      </Typography>
                      <Typography color="p">Course: {query.type}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleItemClick(query, "section1p1")}
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Typography>
          <Typography variant="h7" gutterBottom mt={4}>
            Attendance
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
              {modQueries.attendance?.length ? (
                modQueries.attendance.map((attendance) => (
                  <Card key={attendance._id} sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6">
                        {attendance.description}
                      </Typography>
                      <Typography color="text.secondary">
                        State: {attendance.status}
                      </Typography>
                      <Typography color="p">
                        Market At: {formatTimestamp(attendance.date)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          handleItemClick(attendance, "section1p2")
                        }
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Typography>
          {/* End of Mod Action Awaited Section */}
          {/* Ongoing Activities Section */}
          <Typography variant="h5" gutterBottom mt={4}>
            Ongoing Activities
          </Typography>
          <Typography variant="h7" marginBottom={40} gutterBottom mt={4}>
            Available/Taken Queries
          </Typography>
          <Box
            display="flex"
            marginBottom={1.5}
            marginTop={1.5}
            flexDirection="row"
            flexWrap="wrap"
            gap={2}
          >
            {ongoingActivities.queries?.length ? (
              ongoingActivities.queries.map((queries) => (
                <Card key={queries._id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6">{queries.description}</Typography>
                    <Typography color="text.secondary">
                      State: {queries.status}
                    </Typography>
                    <Typography color="p">Course: {queries.type}</Typography>
                    <Typography color="body1">
                      Last Action (MOD): {queries.last_action_moderator?.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleItemClick(queries, "section2p1")}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Typography variant="h7" marginBottom={40} gutterBottom mt={4}>
            Available/Taken Opportunities
          </Typography>
          <Box
            display="flex"
            marginBottom={1.5}
            marginTop={1.5}
            flexDirection="row"
            flexWrap="wrap"
            gap={2}
          >
            {ongoingActivities.opportunities?.length ? (
              ongoingActivities.opportunities.map((opportunities) => (
                <Card key={opportunities._id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6">{opportunities.title}</Typography>
                    <Typography color="text.secondary">
                      State: {opportunities.state}
                    </Typography>
                    <Typography color="p">
                      Course: {opportunities.course}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        handleItemClick(opportunities, "section2p2")
                      }
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <CircularProgress />
            )}
          </Box>
          {/* Past Activities Section */}
          <Typography variant="h5" gutterBottom mt={4}>
            Past Activities
          </Typography>
          <Typography variant="h7" marginBottom={40} gutterBottom mt={4}>
            Dismissed/Approved/Rejected Queries
          </Typography>
          <Box
            display="flex"
            marginTop={1.5}
            marginBottom={1.5}
            flexDirection="row"
            flexWrap="wrap"
            gap={2}
          >
            {pastActivities.queries?.length ? (
              pastActivities.queries.map((queries) => (
                <Card key={queries._id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6">{queries.description}</Typography>
                    <Typography color="text.secondary">
                      State: {queries.status}
                    </Typography>
                    <Typography color="p">Course: {queries.type}</Typography>
                    <Typography color="body1">
                      Last Action (MOD): {queries.last_action_moderator?.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleItemClick(queries, "section3p1")}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Typography variant="h7" marginBottom={40} gutterBottom mt={4}>
            Expired Opportunities
          </Typography>
          <Box
            display="flex"
            marginTop={1.5}
            marginBottom={1.5}
            flexDirection="row"
            flexWrap="wrap"
            gap={2}
          >
            {pastActivities.opportunities?.length ? (
              pastActivities.opportunities.map((opportunities) => (
                <Card key={opportunities._id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6">{opportunities.title}</Typography>
                    <Typography color="text.secondary">
                      State: {opportunities.state}
                    </Typography>
                    <Typography color="p">
                      Course: {opportunities.course}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        handleItemClick(opportunities, "section3p2")
                      }
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Typography variant="h7" marginBottom={40} gutterBottom mt={4}>
            Approved/Rejected Attendance
          </Typography>
          <Box
            display="flex"
            marginTop={1.5}
            marginBottom={2}
            flexDirection="row"
            flexWrap="wrap"
            gap={2}
          >
            {pastActivities.attendance?.length ? (
              pastActivities.attendance.map((attendace) => (
                <Card key={attendace._id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {attendace.description}
                    </Typography>
                    <Typography color="text.secondary">
                      {attendace.status}
                    </Typography>
                    <Typography variant="body1">
                      Market At: {formatTimestamp(attendace.date)}
                    </Typography>
                    <Typography color="body1">
                      Last Action (MOD): {attendace.last_action_moderator?.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleItemClick(attendace, "section3p3")}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>

        {/* Modal for viewing detailed information */}
        {selectedItem?.type === "section1p1" ? (
          <ModActionAwaitedQuery
            sItem={selectedItem?.item}
            handleClose={handleClose}
            refecth={() => {
              fetechQueries();
              dataHandler();
            }}
          />
        ) : null}
        {selectedItem?.type === "section1p2" ? (
          <ModActionAwaitedAttendance
            sItem={selectedItem?.item}
            handleClose={handleClose}
            refecth={() => {
              fetechQueries();
              dataHandler();
            }}
          />
        ) : null}
        {selectedItem?.type === "section3p1" ? (
          <PastActivitiesDismissQuery
            sItem={selectedItem?.item}
            handleClose={handleClose}
            refecth={() => {
              fetechQueries();
              dataHandler();
            }}
          />
        ) : null}
        {selectedItem?.type === "section3p3" ? (
          <PastActivityAttendace
            sItem={selectedItem?.item}
            handleClose={handleClose}
            refecth={() => {
              fetechQueries();
              dataHandler();
            }}
          />
        ) : null}
        {selectedItem?.type === "section2p1" ? (
          <OngoingActivitesQuery
            sItem={selectedItem?.item}
            handleClose={handleClose}
          />
        ) : null}
        {selectedItem?.type === "section2p2" ? (
          <OngoingAcitivitesOppurtunites
            sItem={selectedItem?.item}
            handleClose={handleClose}
          />
        ) : null}
        {selectedItem?.type === "section3p2" ? (
          <OngoingAcitivitesOppurtunites
            sItem={selectedItem?.item}
            handleClose={handleClose}
          />
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
