// StudentDashboard.js

import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import LoupeIcon from "@mui/icons-material/Loupe";
import Querylist from "../components/querylist";
import axios from "axios";
import { ComplexNavbar } from "../components/newAppbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutoplayBanner from "../components/Headers";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState(null);
  useEffect(() => {
    const data = {};
    const statuses = ["QUEUED", "AVAILABLE", "TAKEN"];
    let url;
    if (statuses.length === 0) {
      url = `https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/?kerberos=${Cookies.get(
        "kerberos"
      )}`;
    } else {
      url = `https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/?kerberos=${Cookies.get(
        "kerberos"
      )}&statuses=${statuses.join(",")}`;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response here
          return response.json(); // Parse the JSON response
        } else {
          // Handle error response
          return response.json().then((errorData) => {
            throw new Error(`${errorData.msg}`);
          });
        }
      })
      .then((responseData) => {
        setQueries(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRefresh = async () => {
    const statuses = ["QUEUED", "AVAILABLE", "TAKEN"];
    let url;
    if (statuses.length === 0) {
      url = `https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/?kerberos=${Cookies.get(
        "kerberos"
      )}`;
    } else {
      url = `https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/?kerberos=${Cookies.get(
        "kerberos"
      )}&statuses=${statuses.join(",")}`;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response here
          return response.json(); // Parse the JSON response
        } else {
          // Handle error response
          return response.json().then((errorData) => {
            throw new Error(`${errorData.msg}`);
          });
        }
      })
      .then((responseData) => {
        setQueries(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{ width: "100vw", height: "max-Content", minHeight: "100vh" }}
      >
        <Box
          display="flex"
          mt={2}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <ComplexNavbar /> {/* Navbar at the top */}
        </Box>

        {/* Autoplay Banner positioned between Navbar and content */}
        <Box sx={{ my: 4, mx: "auto", maxWidth: "90%", mt: 2 }}>
          <AutoplayBanner />
        </Box>

        <Box
          display="flex"
          flexDirection={"column"}
          marginTop="20px"
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

              <Typography variant="body2"></Typography>
            </CardContent>
            <CardActions>
              <Button
                color="blue-gray"
                size="small"
                startIcon={<LoupeIcon />}
                variant="contained"
                onClick={() => {
                  navigate("/student/raise_queries");
                }}
              >
                Query
              </Button>
            </CardActions>
          </Card>

          <Typography variant="h5" component="div">
            Queries
          </Typography>

          <div className="flex justify-end">
            <Button
              onClick={handleRefresh}
              variant="outlined"
              className="flex items-center gap-3 my-2 "
            >
              Refresh
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Button>
          </div>

          <Box
            display="flex"
            justifyContent={"center"}
            flexDirection={"column"}
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
              <Querylist mode="student" data={queries} />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default StudentDashboard;
