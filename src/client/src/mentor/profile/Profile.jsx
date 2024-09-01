import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import ApprovedActivities from "./ApprovedActivities";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import OtherActivities from "./OtherActivities";
import { MentNav } from "../MentNav";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { activityHandler } from "./dataHandler";
import { set } from "mongoose";

const Profile = ({ isMod }) => {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [personalInfo, setPersonalInfo] = useState({});
  const [otherMentors, setOtherMentors] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  const [allOpportunities, setAllOpportunities] = useState([]);

  const [key, setKey] = useState({
    oldpassword: "",
    newPassword: "",
  });
  const [approvQueries, setApprovedQueries] = useState([]);
  const [approvAttendances, setApprovedAttendances] = useState([]);
  const [resolvQueries, setResolvedQueries] = useState([]);
  const [rejectQueries, setRejectedQueries] = useState([]);
  const [expirOpportunities, setExpiredOpportunities] = useState([]);
  const [takenOpportunities, setTakenOpportunities] = useState([]);
  const [rejectAttendances, setRejectedAttendances] = useState([]);

  useEffect(() => {
    fetchPersonalInfo();
    fetchAllAttendace();
    fetchAllQueries();
    fetchAllOpportunities();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const info = await axios.get(
        `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/auth/details/${Cookies.get(
          "kerberos"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (info.status === 200) {
        const department = info.data.kerberos;

        setPersonalInfo(info.data);
      } else {
        toast.error("Error in fetching personal info");
      }
    } catch (er) {
      console.log(er);
      toast.error("Error in fetching personal info");
    }
  };
  const fetchAllQueries = async () => {
    try {
      const res = await axios.get("https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/queries/avquery/"+Cookies.get('kerberos'), {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      if (res.status == 200) {
        setAllQueries(res.data);
      }
    } catch (err) {
      toast.error("Error fetching queries");
      console.log(err);
    }
  };
  const fetchAllAttendace = async () => {
    try {
      const res = await axios.get(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/attendance/"+Cookies.get("kerberos"),
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status == 200) {
        setAllAttendances(res.data);
      }
    } catch (err) {
      toast.error("Error fetching attendance");
      console.log(err);
    }
  };
  const fetchAllOpportunities = async () => {
    try {
      const res = await axios.get(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/opportunity/all",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status == 200) {
        setAllOpportunities(res.data);
      }
    } catch (err) {
      toast.error("Error fetching opportunities");
      console.log(err);
    }
  };
  const setData = ()=>{
    let store = activityHandler(allQueries,allAttendances,allOpportunities);
    setApprovedQueries(store.approvedQueries);
    setApprovedAttendances(store.approvedAttendances);
    setResolvedQueries(store.otherQueries);
    setRejectedQueries(store.rejectedQueries);
    setExpiredOpportunities(store.expiredOpportunities);
    setTakenOpportunities(store.takenOpportunities);
    setRejectedAttendances(store.rejectedAttendances);
  }
  useEffect(()=>{
    setData();
  },[allQueries,allAttendances,allOpportunities])
  

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/auth/change-password",
        {
          kerberos: Cookies.get("kerberos"),
          oldPassword: key.oldpassword,
          newPassword: key.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Password changed successfully");
        setKey({
          oldpassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      console.log(err);
      toast.warn("Please check if the old password is correct");
    }
  };

  const handleModAction = (activity, action) => {
    console.log(`Mod action on ${activity.type}: ${action}`);
  };

  return (
    <>
      <MentNav />
      <div className="min-h-screen bg-gray-100 flex mt-2">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-200 shadow-md transition-transform duration-300 ease-in-out">
          <ul className="list-none p-0 m-0">
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "personal-info"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("personal-info")}
            >
              Personal Info
            </li>
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "change-password"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("change-password")}
            >
              Change Password
            </li>
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "approved-activities"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("approved-activities")}
            >
              Approved Activities
            </li>
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "other-activities"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("other-activities")}
            >
              Other Activities
            </li>
          </ul>
        </div>
        {/* Content */}
        <div className="w-3/4 p-4">
          {activeTab === "personal-info" && (
            <Card className="w-full mb-4">
              <CardBody>
                <Typography variant="h5" className="mb-4">
                  Personal Info
                </Typography>
                <div className="mb-4">
                  <Typography>
                    <strong>Name:</strong> {personalInfo.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong>{" "}
                    {`${personalInfo.kerberos}@iitd.ac.in`}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {personalInfo.phone_number}
                  </Typography>
                  <Typography>
                    <strong>Department:</strong>{" "}
                    {personalInfo.kerberos?.slice(0, 3).toUpperCase()}
                  </Typography>
                  <Typography>
                    <strong>Total Hours:</strong> {personalInfo.hours}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          )}
          {activeTab === "change-password" && (
            <Card className="w-full mb-4">
              <CardBody>
                <Typography variant="h5" className="mb-4">
                  Change Password
                </Typography>
                <form
                  onSubmit={handleChangePassword}
                  className="flex flex-col gap-4"
                >
                  <Input
                    type="password"
                    label="Old Password"
                    value={key.oldpassword}
                    onChange={(e) => {
                      setKey({ ...key, oldpassword: e.target.value });
                    }}
                    required
                  />
                  <Input
                    type="password"
                    label="New Password"
                    value={key.newPassword}
                    onChange={(e) => {
                      setKey({ ...key, newPassword: e.target.value });
                    }}
                    required
                  />
                  <Button type="submit" color="blue" ripple="light">
                    Change Password
                  </Button>
                </form>
              </CardBody>
            </Card>
          )}
          {activeTab === "approved-activities" && (
            <ApprovedActivities
              queries={approvQueries}
              attendances={approvAttendances}
            />
          )}
          {activeTab === "other-activities" && (
            <OtherActivities
              resolvedQueries={resolvQueries}
              rejectedQueries={rejectQueries}
              expiredOpportunities={expirOpportunities}
              takenOpportunities={takenOpportunities}
              rejectedAttendances={rejectAttendances}
              isMod={isMod}
              handleModAction={handleModAction}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
